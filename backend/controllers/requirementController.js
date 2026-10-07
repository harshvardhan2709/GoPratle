const Requirement = require('../models/Requirement');

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns a plain { success, message } error object with a given status code.
 * We attach statusCode so the central errorHandler middleware can pick it up.
 */
const createError = (message, statusCode = 400) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

/**
 * Validate category-specific required fields.
 * Returns an error message string if invalid, or null if valid.
 */
const validateCategoryDetails = (category, body) => {
  if (category === 'planner') {
    if (!body.planningExperience) return 'Planning experience is required for planner category';
    if (!body.eventScale) return 'Event scale is required for planner category';
    if (!body.servicesRequired) return 'Services required is required for planner category';
  }

  if (category === 'performer') {
    if (!body.performerType) return 'Performer type is required for performer category';
    if (!body.genre) return 'Genre is required for performer category';
    if (!body.numberOfPerformers || Number(body.numberOfPerformers) < 1)
      return 'Number of performers must be at least 1';
    if (!body.performanceDuration) return 'Performance duration is required for performer category';
  }

  if (category === 'crew') {
    if (!body.crewRole) return 'Crew role is required for crew category';
    if (!body.numberOfCrewMembers || Number(body.numberOfCrewMembers) < 1)
      return 'Number of crew members must be at least 1';
    if (!body.experienceLevel) return 'Experience level is required for crew category';
  }

  return null;
};

// ── POST /api/requirements ────────────────────────────────────────────────────

const createRequirement = async (req, res, next) => {
  try {
    const body = req.body;

    // 1. Check top-level required fields
    const requiredFields = ['eventName', 'eventType', 'startDate', 'endDate', 'location', 'category'];
    const missing = requiredFields.filter((f) => !body[f] || String(body[f]).trim() === '');
    if (missing.length > 0) {
      return next(createError(`Missing required fields: ${missing.join(', ')}`));
    }

    // 2. Validate category value
    const allowedCategories = ['planner', 'performer', 'crew'];
    if (!allowedCategories.includes(body.category)) {
      return next(createError('Category must be one of: planner, performer, crew'));
    }

    // 3. Validate dates
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    if (isNaN(startDate.getTime())) return next(createError('Start date is invalid'));
    if (isNaN(endDate.getTime())) return next(createError('End date is invalid'));
    if (endDate < startDate) return next(createError('End date cannot be before start date'));

    // 4. Validate category-specific fields
    const categoryError = validateCategoryDetails(body.category, body);
    if (categoryError) return next(createError(categoryError));

    // 5. Build the document
    const requirementData = {
      eventName: body.eventName.trim(),
      eventType: body.eventType.trim(),
      startDate,
      endDate,
      location: body.location.trim(),
      venue: body.venue ? body.venue.trim() : '',
      category: body.category,
    };

    // Attach only the relevant category details
    if (body.category === 'planner') {
      requirementData.plannerDetails = {
        planningExperience: body.planningExperience || '',
        eventScale: body.eventScale || '',
        servicesRequired: body.servicesRequired || '',
        budget: body.budget || '',
        numberOfEvents: body.numberOfEvents ? Number(body.numberOfEvents) : undefined,
        specialRequirements: body.specialRequirements || '',
      };
    }

    if (body.category === 'performer') {
      requirementData.performerDetails = {
        performerType: body.performerType || '',
        genre: body.genre || '',
        numberOfPerformers: body.numberOfPerformers ? Number(body.numberOfPerformers) : undefined,
        performanceDuration: body.performanceDuration || '',
        budget: body.budget || '',
        technicalRequirements: body.technicalRequirements || '',
        specialRequirements: body.specialRequirements || '',
      };
    }

    if (body.category === 'crew') {
      requirementData.crewDetails = {
        crewRole: body.crewRole || '',
        numberOfCrewMembers: body.numberOfCrewMembers ? Number(body.numberOfCrewMembers) : undefined,
        experienceLevel: body.experienceLevel || '',
        budget: body.budget || '',
        workingHours: body.workingHours || '',
        requiredSkills: body.requiredSkills || '',
        specialRequirements: body.specialRequirements || '',
      };
    }

    // 6. Save to MongoDB
    const requirement = new Requirement(requirementData);
    await requirement.save();

    // 7. Respond
    res.status(201).json({
      success: true,
      message: 'Requirement created successfully',
      data: {
        _id: requirement._id,
        eventName: requirement.eventName,
        category: requirement.category,
        createdAt: requirement.createdAt,
      },
    });
  } catch (err) {
    // Handle Mongoose validation errors cleanly
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return next(createError(messages.join('; ')));
    }
    next(err);
  }
};

// ── GET /api/requirements ─────────────────────────────────────────────────────

const getRequirements = async (req, res, next) => {
  try {
    const requirements = await Requirement.find()
      .select('eventName eventType category location startDate endDate createdAt status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements,
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/requirements/:id ─────────────────────────────────────────────────

const getRequirementById = async (req, res, next) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return next(createError('Requirement not found', 404));
    }

    res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (err) {
    // Invalid ObjectId format
    if (err.name === 'CastError') {
      return next(createError('Invalid requirement ID format', 400));
    }
    next(err);
  }
};

// ── PUT /api/requirements/:id ─────────────────────────────────────────────────

const updateRequirement = async (req, res, next) => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) {
      return next(createError('Requirement not found', 404));
    }

    const body = req.body;

    // Validate category value if provided
    if (body.category) {
      const allowedCategories = ['planner', 'performer', 'crew'];
      if (!allowedCategories.includes(body.category)) {
        return next(createError('Category must be one of: planner, performer, crew'));
      }
    }

    // Validate category-specific fields if category is provided or already exists
    const categoryToValidate = body.category || requirement.category;
    
    // We construct a temporary merged object to validate against
    // using the existing nested fields overlaid with new body fields
    const mergedData = { ...body };
    if (categoryToValidate === requirement.category) {
       const existingDetails = requirement[`${categoryToValidate}Details`] || {};
       Object.keys(existingDetails.toObject ? existingDetails.toObject() : existingDetails).forEach(k => {
           if (mergedData[k] === undefined) mergedData[k] = existingDetails[k];
       });
    }

    const categoryError = validateCategoryDetails(categoryToValidate, mergedData);
    if (categoryError) return next(createError(categoryError));

    // Validate status if provided
    if (body.status) {
        const allowedStatuses = ['Open', 'In Progress', 'Completed', 'Cancelled'];
        if (!allowedStatuses.includes(body.status)) {
            return next(createError('Invalid status'));
        }
    }

    // Basic updates
    if (body.eventName) requirement.eventName = body.eventName.trim();
    if (body.eventType) requirement.eventType = body.eventType.trim();
    if (body.startDate) requirement.startDate = new Date(body.startDate);
    if (body.endDate) requirement.endDate = new Date(body.endDate);
    if (body.location) requirement.location = body.location.trim();
    if (body.venue !== undefined) requirement.venue = body.venue.trim();
    if (body.status) requirement.status = body.status;

    // If category changed, clear old details
    if (body.category && body.category !== requirement.category) {
        requirement.plannerDetails = null;
        requirement.performerDetails = null;
        requirement.crewDetails = null;
        requirement.category = body.category;
    }

    // Update category-specific fields
    const cat = requirement.category;
    if (cat === 'planner') {
      if (!requirement.plannerDetails) requirement.plannerDetails = {};
      if (body.planningExperience !== undefined) requirement.plannerDetails.planningExperience = body.planningExperience;
      if (body.eventScale !== undefined) requirement.plannerDetails.eventScale = body.eventScale;
      if (body.servicesRequired !== undefined) requirement.plannerDetails.servicesRequired = body.servicesRequired;
      if (body.budget !== undefined) requirement.plannerDetails.budget = body.budget;
      if (body.numberOfEvents !== undefined) requirement.plannerDetails.numberOfEvents = Number(body.numberOfEvents);
      if (body.specialRequirements !== undefined) requirement.plannerDetails.specialRequirements = body.specialRequirements;
    } else if (cat === 'performer') {
      if (!requirement.performerDetails) requirement.performerDetails = {};
      if (body.performerType !== undefined) requirement.performerDetails.performerType = body.performerType;
      if (body.genre !== undefined) requirement.performerDetails.genre = body.genre;
      if (body.numberOfPerformers !== undefined) requirement.performerDetails.numberOfPerformers = Number(body.numberOfPerformers);
      if (body.performanceDuration !== undefined) requirement.performerDetails.performanceDuration = body.performanceDuration;
      if (body.budget !== undefined) requirement.performerDetails.budget = body.budget;
      if (body.technicalRequirements !== undefined) requirement.performerDetails.technicalRequirements = body.technicalRequirements;
      if (body.specialRequirements !== undefined) requirement.performerDetails.specialRequirements = body.specialRequirements;
    } else if (cat === 'crew') {
      if (!requirement.crewDetails) requirement.crewDetails = {};
      if (body.crewRole !== undefined) requirement.crewDetails.crewRole = body.crewRole;
      if (body.numberOfCrewMembers !== undefined) requirement.crewDetails.numberOfCrewMembers = Number(body.numberOfCrewMembers);
      if (body.experienceLevel !== undefined) requirement.crewDetails.experienceLevel = body.experienceLevel;
      if (body.budget !== undefined) requirement.crewDetails.budget = body.budget;
      if (body.workingHours !== undefined) requirement.crewDetails.workingHours = body.workingHours;
      if (body.requiredSkills !== undefined) requirement.crewDetails.requiredSkills = body.requiredSkills;
      if (body.specialRequirements !== undefined) requirement.crewDetails.specialRequirements = body.specialRequirements;
    }

    await requirement.save();

    res.status(200).json({
      success: true,
      message: 'Requirement updated successfully',
      data: requirement,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(createError('Invalid requirement ID format', 400));
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return next(createError(messages.join('; ')));
    }
    next(err);
  }
};

// ── DELETE /api/requirements/:id ──────────────────────────────────────────────

const deleteRequirement = async (req, res, next) => {
  try {
    const requirement = await Requirement.findByIdAndDelete(req.params.id);

    if (!requirement) {
      return next(createError('Requirement not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Requirement deleted successfully',
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(createError('Invalid requirement ID format', 400));
    }
    next(err);
  }
};

module.exports = { createRequirement, getRequirements, getRequirementById, updateRequirement, deleteRequirement };

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
      .select('eventName eventType category location startDate endDate createdAt')
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

module.exports = { createRequirement, getRequirements, getRequirementById };

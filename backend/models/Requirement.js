const mongoose = require('mongoose');

// ── Category-specific sub-schemas ────────────────────────────────────────────

const plannerDetailsSchema = new mongoose.Schema(
  {
    planningExperience: { type: String, trim: true },
    eventScale: {
      type: String,
      enum: ['small', 'medium', 'large', 'mega', ''],
      default: '',
    },
    servicesRequired: { type: String, trim: true },
    // Step 3 fields
    budget: { type: String, trim: true },
    numberOfEvents: { type: Number, min: 1 },
    specialRequirements: { type: String, trim: true },
  },
  { _id: false }
);

const performerDetailsSchema = new mongoose.Schema(
  {
    performerType: { type: String, trim: true },
    genre: { type: String, trim: true },
    numberOfPerformers: { type: Number, min: 1 },
    performanceDuration: { type: String, trim: true },
    // Step 3 fields
    budget: { type: String, trim: true },
    technicalRequirements: { type: String, trim: true },
    specialRequirements: { type: String, trim: true },
  },
  { _id: false }
);

const crewDetailsSchema = new mongoose.Schema(
  {
    crewRole: { type: String, trim: true },
    numberOfCrewMembers: { type: Number, min: 1 },
    experienceLevel: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'expert', ''],
      default: '',
    },
    // Step 3 fields
    budget: { type: String, trim: true },
    workingHours: { type: String, trim: true },
    requiredSkills: { type: String, trim: true },
    specialRequirements: { type: String, trim: true },
  },
  { _id: false }
);

// ── Main Requirement schema ───────────────────────────────────────────────────

const requirementSchema = new mongoose.Schema(
  {
    // Step 1 — Event Basics
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      maxlength: [200, 'Event name cannot exceed 200 characters'],
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true,
      maxlength: [100, 'Event type cannot exceed 100 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    venue: {
      type: String,
      trim: true,
      maxlength: [200, 'Venue cannot exceed 200 characters'],
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['planner', 'performer', 'crew'],
        message: 'Category must be one of: planner, performer, crew',
      },
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Open',
    },

    // Category-specific details (only the relevant one will be populated)
    plannerDetails: { type: plannerDetailsSchema, default: null },
    performerDetails: { type: performerDetailsSchema, default: null },
    crewDetails: { type: crewDetailsSchema, default: null },
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,
  }
);

// ── Cross-field validation (endDate must be >= startDate) ────────────────────

requirementSchema.pre('save', function (next) {
  if (this.startDate && this.endDate && this.endDate < this.startDate) {
    const err = new Error('End date cannot be before start date');
    err.statusCode = 400;
    return next(err);
  }
  next();
});

module.exports = mongoose.model('Requirement', requirementSchema);

const express = require('express');
const router = express.Router();

const {
  createRequirement,
  getRequirements,
  getRequirementById,
} = require('../controllers/requirementController');

// POST /api/requirements   — create a new requirement
router.post('/', createRequirement);

// GET /api/requirements    — list all requirements
router.get('/', getRequirements);

// GET /api/requirements/:id — get a single requirement
router.get('/:id', getRequirementById);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  createRequirement,
  getRequirements,
  getRequirementById,
  updateRequirement,
  deleteRequirement
} = require('../controllers/requirementController');

// POST /api/requirements   — create a new requirement
router.post('/', createRequirement);

// GET /api/requirements    — list all requirements
router.get('/', getRequirements);

// GET /api/requirements/:id — get a single requirement
router.get('/:id', getRequirementById);

// PUT /api/requirements/:id — update a requirement
router.put('/:id', updateRequirement);

// DELETE /api/requirements/:id — delete a requirement
router.delete('/:id', deleteRequirement);

module.exports = router;

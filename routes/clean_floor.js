const express = require('express');
const router = express.Router();
const clean_floor_controller = require('../controllers/clean_floor');

// ------------------ Contact Tracing ------------------
router.post('/', clean_floor_controller.count);

module.exports = router;
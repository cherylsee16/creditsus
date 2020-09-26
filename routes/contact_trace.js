const express = require('express');
const router = express.Router();
const contact_tracing_controller = require('../controllers/contact_tracing');

// ------------------ Contact Tracing ------------------
router.post('/', contact_tracing_controller.trace);

module.exports = router;
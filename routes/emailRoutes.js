// routes/emailRoutes.js
const express = require('express');
const { sendEmail } = require('../controllers/emailControllers');
const { sendProposalEmail } = require('../controllers/getAProposal');
const router = express.Router();

router.post('/getInTouch', sendEmail);
router.post('/getAProposal', sendProposalEmail);

module.exports = router;

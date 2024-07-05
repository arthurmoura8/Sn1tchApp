const express = require('express');
const { getGitHubContributions, getGoogleDocsContributions } = require('../controllers/contributionController');
const router = express.Router();

router.get('/github/:groupId', getGitHubContributions);
router.get('/googledocs/:groupId', getGoogleDocsContributions);

module.exports = router;

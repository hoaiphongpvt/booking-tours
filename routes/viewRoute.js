const express = require('express');
const router = express.Router();

const viewController = require('./../controllers/viewController');

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);

module.exports = router;

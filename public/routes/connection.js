var express = require('express');
var router = express.Router();
const connectionController = require('../controllers/connection');

router.get('/new-event', connectionController.goToAddNewEvent);

router.post('/new-event-submit', connectionController.validateAddNewEvent, connectionController.addNewEvent);

router.post('/going-yes/:id', connectionController.updateGoingYes);

router.post('/going-no/:id', connectionController.updateGoingNo);

router.post('/going-maybe/:id', connectionController.updateGoingMaybe);

router.post('/delete-connection/:id', connectionController.deleteConnection);

router.get('/:eventId', connectionController.getEventWithId);

router.get('/', connectionController.getAllConnections);

router.get('/*', connectionController.redirectToConnections);

module.exports = router;

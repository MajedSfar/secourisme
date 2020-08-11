const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');
const alerteCtrl = require('../controllers/alerte.controller');
const notificationCtrl = require('../controllers/notification.controller');
const imageCtrl = require('../controllers/image.controller');

router.post('/user/register', userCtrl.register);
router.post('/user/authenticate', userCtrl.authenticate);
// alertes
router.get('/alertes/get', alerteCtrl.getAll);
router.post('/alertes/add', alerteCtrl.add);
router.post('/alertes/update/:id', alerteCtrl.update);
router.delete('/alertes/delete/:id', alerteCtrl.delete);
// notifications
router.get('/notifications/get', notificationCtrl.getAll);
router.post('/notifications/update/:id', notificationCtrl.update);
router.delete('/notifications/delete/:id', notificationCtrl.delete);
// image
router.get('/images/get', imageCtrl.getAll);
router.post('/images/add', imageCtrl.add);
router.post('/images/update/:id', imageCtrl.update);
router.delete('/images/delete/:id', imageCtrl.delete);



module.exports = router;
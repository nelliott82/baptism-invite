const controller = require('./controllers');
const router = require('express').Router();

router.get('/admin/verify/:uuid', controller.admin.verify);

router.put('/admin/login', controller.admin.login);

router.put('/admin/logout', controller.admin.logout);

router.get('/admin/:uuid', controller.admin.get);

router.post('/admin', controller.admin.post);

router.delete('/admin/:id', controller.admin.delete);

router.get('/invitees/:uuid', controller.invitees.get);

router.put('/invitees', controller.invitees.put);

module.exports = router;
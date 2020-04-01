const express = require('express');
const connection = require('./database/connect');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const incidentController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const profileAdminController = require('./controllers/profileAdminController');
const adminController = require('./controllers/adminController');
const sessionAdminProfileController = require('./controllers/sessionProfileAdminController');

routes.post('/sessions', sessionController.create);

routes.post('/sessions/admin', sessionAdminProfileController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', profileController.index);

routes.post('/admin', adminController.create);

routes.get('/administrator/profile', profileAdminController.index);
routes.delete('/administrator/profile/:id', profileAdminController.delete);

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);


module.exports = routes;
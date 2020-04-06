const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');
const connection = require('./database/connect');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const incidentController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const profileAdminController = require('./controllers/profileAdminController');
const adminController = require('./controllers/adminController');
const sessionAdminProfileController = require('./controllers/sessionProfileAdminController');

routes.post('/sessions', celebrate({
    [Segments.BODY] : Joi.object().keys({
        id: Joi.string().required(),
    }),
}), sessionController.create);

routes.post('/sessions/admin', celebrate({
    [Segments.BODY] : Joi.object().keys({
        login: Joi.string().required(),
        pass: Joi.string().required(),
    }),
}), sessionAdminProfileController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required(),
    }).unknown,
}), profileController.index);

routes.post('/admin', celebrate({
    [Segments.BODY] : Joi.object().keys({
        login: Joi.string().required(),
        pass: Joi.string().required(),
    }),
}), adminController.create);

routes.get('/administrator/profile', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number(),
    }),
}), profileAdminController.index);

routes.delete('/administrator/profile/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.string().required(),
    }),
}), profileAdminController.delete);

routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number(),
    }),
}), incidentController.index);

routes.post('/incidents', celebrate({
    [Segments.BODY] : Joi.object().keys({
        title: Joi.string().required().min(15),
        description: Joi.string().required().min(25),
        value: Joi.number().required(),
    }),
}), incidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    }),
}), incidentController.delete);


module.exports = routes;
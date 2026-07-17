const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    companyId: Joi.string().custom(objectId).required(),
  }),
};

const getProjects = {
  query: Joi.object().keys({
    name: Joi.string(),
    companyId: Joi.string().custom(objectId),
    withCompany: Joi.boolean().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    withCompany: Joi.boolean(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      companyId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};

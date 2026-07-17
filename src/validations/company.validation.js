const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCompany = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    role: Joi.string(),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
  }),
};

const getCompanies = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    withProjects: Joi.boolean().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    withProjects: Joi.boolean(),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      role: Joi.string(),
      description: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
    .min(1),
};

const deleteCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};

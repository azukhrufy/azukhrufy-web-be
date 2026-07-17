const httpStatus = require('http-status');
const { Project, Company } = require('../models');
const ApiError = require('../utils/ApiError');

const createProject = async (projectBody) => {
  const company = await Company.findById(projectBody.companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  return Project.create(projectBody);
};

const queryProjects = async (filter, options, withCompany) => {
  const queryOptions = withCompany ? { ...options, populate: 'company' } : options;
  return Project.paginate(filter, queryOptions);
};

const getProjectById = async (id, withCompany) => {
  const query = Project.findById(id);
  if (withCompany) query.populate('company');
  return query.exec();
};

const updateProjectById = async (projectId, updateBody) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  if (updateBody.companyId) {
    const company = await Company.findById(updateBody.companyId);
    if (!company) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
    }
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

const deleteProjectById = async (projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  await project.deleteOne();
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};

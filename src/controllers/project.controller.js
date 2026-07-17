const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'companyId']);
  // Support nested route: /companies/:companyId/projects
  if (req.params.companyId) {
    filter.companyId = req.params.companyId;
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const withCompany = req.query.withCompany === 'true';
  const result = await projectService.queryProjects(filter, options, withCompany);
  res.send(result);
});

const getProject = catchAsync(async (req, res) => {
  const withCompany = req.query.withCompany === 'true';
  const project = await projectService.getProjectById(req.params.projectId, withCompany);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(req.params.projectId, req.body);
  res.send(project);
});

const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProjectById(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};

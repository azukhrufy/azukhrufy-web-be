const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');

const createCompany = async (companyBody) => {
  if (await Company.isNameTaken(companyBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Company name already taken');
  }
  return Company.create(companyBody);
};

const queryCompanies = async (filter, options, withProjects) => {
  const result = await Company.paginate(filter, options);
  if (withProjects && result.results.length > 0) {
    await Company.populate(result.results, { path: 'projects' });
  }
  return result;
};

const getCompanyById = async (id, withProjects) => {
  const query = Company.findById(id);
  if (withProjects) query.populate('projects');
  return query.exec();
};

const updateCompanyById = async (companyId, updateBody) => {
  const company = await getCompanyById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  if (updateBody.name && (await Company.isNameTaken(updateBody.name, companyId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Company name already taken');
  }
  Object.assign(company, updateBody);
  await company.save();
  return company;
};

const deleteCompanyById = async (companyId) => {
  const company = await getCompanyById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  await company.deleteOne();
  return company;
};

module.exports = {
  createCompany,
  queryCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
};

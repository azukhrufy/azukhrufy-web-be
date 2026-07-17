const allRoles = {
  user: ['manageCompanies', 'manageProjects'],
  admin: ['getUsers', 'manageUsers', 'manageCompanies', 'manageProjects'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

const db = require('../data/db');
const AppError = require('../utils/AppError');

const getAllRoles = () => {
  return db.getRoles();
};

const getRoleByIdOrName = (identifier) => {
  const roleId = parseInt(identifier, 10);
  const role = isNaN(roleId) ? db.getRoleByName(identifier) : db.getRoleById(roleId);
  
  if (!role) throw new AppError('Role not found', 404);
  return role;
};

const createRole = (data) => {
  const { name, description, type, scope } = data;
  const newRole = db.createRole({ name, description, type, scope });
  
  if (!newRole) throw new AppError('Role already exists', 400);
  return newRole;
};

const updateRole = (identifier, data) => {
  const roleId = parseInt(identifier, 10);
  const targetId = isNaN(roleId) ? (db.getRoleByName(identifier)?.id) : roleId;

  if (!targetId) throw new AppError('Role not found', 404);

  const updatedRole = db.updateRole(targetId, data);
  if (!updatedRole) throw new AppError('Role not found to update', 404);
  
  return updatedRole;
};

const deleteRole = (identifier) => {
  const roleId = parseInt(identifier, 10);
  const targetId = isNaN(roleId) ? (db.getRoleByName(identifier)?.id) : roleId;

  if (!targetId) throw new AppError('Role not found', 404);

  const success = db.deleteRole(targetId);
  if (!success) throw new AppError('Role not found to delete', 404);
  
  return success;
};

const assignRole = (userId, rawRoleId) => {
  let roleId;
  if (typeof rawRoleId === 'string' && isNaN(parseInt(rawRoleId, 10))) {
    const role = db.getRoleByName(rawRoleId);
    if (role) roleId = role.id;
  } else {
    roleId = parseInt(rawRoleId, 10);
  }

  if (!roleId) throw new AppError('roleId is required for assignment', 400);

  const updatedUser = db.assignRoleToUser(userId, roleId);
  if (!updatedUser) {
    throw new AppError('User or Role not found', 404);
  }
  return updatedUser;
};

const removeRole = (userId, rawRoleId) => {
  let roleId;

  if (isNaN(parseInt(rawRoleId, 10))) {
    const role = db.getRoleByName(rawRoleId);
    if (role) roleId = role.id;
  } else {
    roleId = parseInt(rawRoleId, 10);
  }

  if (!roleId) throw new AppError('Role not found', 404);
  
  const updatedUser = db.removeRoleFromUser(userId, roleId);
  if (!updatedUser) throw new AppError('User or Assignment not found', 404);
  
  return updatedUser;
};

module.exports = {
  getAllRoles,
  getRoleByIdOrName,
  createRole,
  updateRole,
  deleteRole,
  assignRole,
  removeRole
};

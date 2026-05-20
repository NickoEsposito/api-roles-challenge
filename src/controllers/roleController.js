const roleService = require('../services/roleService');

const getAllRoles = (req, res, next) => {
  try {
    const roles = roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

const getRole = (req, res, next) => {
  try {
    const role = roleService.getRoleByIdOrName(req.params.id);
    res.json(role);
  } catch (error) {
    next(error);
  }
};

const createRole = (req, res, next) => {
  try {
    const newRole = roleService.createRole(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

const updateRole = (req, res, next) => {
  try {
    const updatedRole = roleService.updateRole(req.params.id, req.body);
    res.json(updatedRole);
  } catch (error) {
    next(error);
  }
};

const deleteRole = (req, res, next) => {
  try {
    roleService.deleteRole(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const assignRole = (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const updatedUser = roleService.assignRole(userId, req.body.roleId);
    res.json({ message: 'Role successfully assigned to user', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const removeRole = (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    roleService.removeRole(userId, req.params.roleId);
    res.json({ message: 'Role successfully removed from user' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  assignRole,
  removeRole
};

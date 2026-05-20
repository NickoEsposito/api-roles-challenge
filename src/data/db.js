let users = [
  { id: 1, username: 'admin', roleId: 1, token: 'token-admin-123' },
  { id: 2, username: 'user1', roleId: 2, token: 'token-user-123' },
  { id: 3, username: 'guest', roleId: 3, token: 'token-guest-123' }
];

let roles = [
  { id: 1, name: 'admin', description: 'Administrator with full access', type: 'system', scope: 'global' },
  { id: 2, name: 'user', description: 'Standard user', type: 'system', scope: 'global' },
  { id: 3, name: 'guest', description: 'Read-only guest', type: 'system', scope: 'global' }
];
let nextRoleId = 4;

module.exports = {
  // === Auth & User Queries ===
  
  getUserByToken: (token) => users.find(u => u.token === token),
  getUsers: () => users,
  getUserById: (id) => users.find(u => u.id === id),

  // === Roles CRUD ===

  getRoles: () => roles,
  getRoleById: (id) => roles.find(r => r.id === id),
  getRoleByName: (name) => roles.find(r => r.name === name),
  
  createRole: (roleData) => {
    if (roles.find(r => r.name === roleData.name)) return null; // Role exists
    const newRole = { 
      id: nextRoleId++, 
      name: roleData.name, 
      description: roleData.description || '',
      type: roleData.type || 'custom',
      scope: roleData.scope || 'local'
    };
    roles.push(newRole);
    return newRole;
  },

  updateRole: (id, updateData) => {
    const index = roles.findIndex(r => r.id === id);
    if (index === -1) return null;
    roles[index] = { ...roles[index], ...updateData, id }; 
    return roles[index];
  },

  deleteRole: (id) => {
    const index = roles.findIndex(r => r.id === id);
    if (index === -1) return false;
    roles.splice(index, 1);
    users = users.map(u => u.roleId === id ? { ...u, roleId: null } : u);
    return true;
  },

  // === Assignments ===

  assignRoleToUser: (userId, roleId) => {
    const user = users.find(u => u.id === userId);
    const roleExists = roles.find(r => r.id === roleId);
    
    if (!user || !roleExists) return null;
    user.roleId = roleId;
    return user;
  },

  removeRoleFromUser: (userId, roleId) => {
    const user = users.find(u => u.id === userId);
    if (!user || user.roleId !== roleId) return null;
    user.roleId = null;
    return user;
  }
};

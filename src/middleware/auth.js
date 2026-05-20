const db = require('../data/db');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  
  if (token !== process.env.TOKEN_AUTH) {
    return res.status(401).json({ message: 'Invalid token' });
  }


  req.user = { id: 1, roleId: 1 }; 
  next();
};

const authorizeRole = (roleName) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
    }
    
    const role = db.getRoleById(req.user.roleId);
    if (!role || role.name !== roleName) {
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
    }
    
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole
};

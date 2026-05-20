const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { authenticateToken, authorizeRole } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const { validateRole } = require('./middleware/validator');
const roleController = require('./controllers/roleController');

const app = express();
app.use(express.json());

// ==========================================
// SWAGGER DOCUMENTATION
// ==========================================
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ==========================================
// RUTAS DE ROLES (CRUD)
// ==========================================

app.get('/', (req, res) => {
    res.json({ message: "API de Roles y Usuarios funcionando. Ve a /docs para ver la documentación." });
});

app.get('/api/roles', authenticateToken, roleController.getAllRoles);
app.get('/api/roles/:id', authenticateToken, roleController.getRole);
app.post('/api/roles', authenticateToken, authorizeRole('admin'), validateRole, roleController.createRole);
app.put('/api/roles/:id', authenticateToken, authorizeRole('admin'), roleController.updateRole);
app.delete('/api/roles/:id', authenticateToken, authorizeRole('admin'), roleController.deleteRole);

// ==========================================
// RUTAS DE ASIGNACIÓN DE ROLES A USUARIOS
// ==========================================

app.post('/api/users/:userId/roles', authenticateToken, authorizeRole('admin'), roleController.assignRole);
app.delete('/api/users/:userId/roles/:roleId', authenticateToken, authorizeRole('admin'), roleController.removeRole);

// ==========================================
// MIDDLEWARE DE MANEJO DE ERRORES CENTRALIZADO
// ==========================================
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  });
}

module.exports = app;

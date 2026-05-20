const request = require('supertest');
const app = require('../src/app');

process.env.TOKEN_AUTH = 'secret-token-123';

describe('Roles & Assignments API', () => {
  const authToken = 'Bearer secret-token-123';

  describe('GET /api/roles', () => {
    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/roles');
      expect(res.status).toBe(401);
    });

    it('should return 200 and a list of roles if authenticated', async () => {
      const res = await request(app)
        .get('/api/roles')
        .set('Authorization', authToken);
        
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('POST /api/roles', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', authToken)
        .send({ description: 'No name provided' });
        
      expect(res.status).toBe(400);
    });

    it('should create a new role and return 201 if admin', async () => {
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', authToken)
        .send({ name: 'editor', description: 'Can edit posts', type: 'custom' });
        
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('editor');
      expect(res.body.id).toBeDefined();
    });
  });

  describe('Assignments /api/users/:userId/roles', () => {
    it('should assign a role to a user (admin only)', async () => {
      const res = await request(app)
        .post('/api/users/2/roles')
        .set('Authorization', authToken)
        .send({ roleId: 'admin' }); 
        
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Role successfully assigned to user');
      expect(res.body.user.roleId).toBe(1); 
    });

    it('should remove a role assignment from a user (admin only)', async () => {
      const res = await request(app)
        .delete('/api/users/2/roles/1')
        .set('Authorization', authToken);
        
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Role successfully removed from user');
    });
    
    it('should return 404 for invalid assignment removal', async () => {
      const res = await request(app)
        .delete('/api/users/999/roles/1')
        .set('Authorization', authToken);
        
      expect(res.status).toBe(404);
    });
  });
});

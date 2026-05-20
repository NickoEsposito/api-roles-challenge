const request = require('supertest');
const app = require('../src/app');

describe('Roles & Assignments API', () => {
  const adminToken = 'Bearer token-admin-123';
  const userToken = 'Bearer token-user-123';

  describe('GET /api/roles', () => {
    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/roles');
      expect(res.status).toBe(401);
    });

    it('should return 200 and a list of roles if authenticated', async () => {
      const res = await request(app)
        .get('/api/roles')
        .set('Authorization', userToken);
        
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('POST /api/roles', () => {
    it('should return 403 if user is not admin', async () => {
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', userToken)
        .send({ name: 'tester', description: 'QA role' });
        
      expect(res.status).toBe(403);
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', adminToken)
        .send({ description: 'No name provided' });
        
      expect(res.status).toBe(400);
    });

    it('should create a new role and return 201 if admin', async () => {
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', adminToken)
        .send({ name: 'editor', description: 'Can edit posts', type: 'custom' });
        
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('editor');
      expect(res.body.id).toBeDefined();
    });
  });

  describe('Assignments /api/users/:userId/roles', () => {
    it('should assign a role to a user (admin only)', async () => {
      // User 2 initially has roleId 2 ('user')
      const res = await request(app)
        .post('/api/users/2/roles')
        .set('Authorization', adminToken)
        .send({ roleId: 'admin' }); // Passing role name 'admin' as ID string per swagger flexibility
        
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Role successfully assigned to user');
      expect(res.body.user.roleId).toBe(1); // 1 is the 'admin' roleId
    });

    it('should remove a role assignment from a user (admin only)', async () => {
      const res = await request(app)
        .delete('/api/users/2/roles/1')
        .set('Authorization', adminToken);
        
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Role successfully removed from user');
    });
    
    it('should return 404 for invalid assignment removal', async () => {
      const res = await request(app)
        .delete('/api/users/999/roles/1')
        .set('Authorization', adminToken);
        
      expect(res.status).toBe(404);
    });
  });
});

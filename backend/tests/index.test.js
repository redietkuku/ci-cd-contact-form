const request = require('supertest');
const app = require('../app');

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('returns 200 and healthy status', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/contact', () => {
    it('accepts a valid submission', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Abebe Kebede',
          email: 'abebe@example.com',
          message: 'Test message'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('rejects missing fields', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ name: 'Abebe' });

      expect(res.status).toBe(400);
    });

    it('rejects invalid email', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Abebe',
          email: 'invalid',
          message: 'Hello'
        });

      expect(res.status).toBe(400);
    });
  });
});

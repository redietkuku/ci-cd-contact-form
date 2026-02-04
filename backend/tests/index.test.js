// Supertest is used to simulate HTTP requests to the backend API
const request = require('supertest');

// Import the Express application instance
// If this import fails, the CI pipeline will fail immediately
const app = require('../app');

describe('API Endpoints', () => {

  /**
   * HEALTH CHECK TESTS
   * These tests ensure that the backend server is running
   * and responding correctly. This endpoint is commonly
   * used by CI/CD pipelines and monitoring tools.
   */
  describe('GET /api/health', () => {
    it('returns 200 and healthy status', async () => {
      // Send a GET request to the health endpoint
      const res = await request(app).get('/api/health');

      // Verify that the server responds successfully
      expect(res.status).toBe(200);

      // Verify that the API reports a healthy status
      // (Changing this expected value during a demo will
      // cause the CI pipeline to fail)
      expect(res.body.status).toBe('healthy');

      // Ensure a timestamp is included for monitoring purposes
      expect(res.body.timestamp).toBeDefined();
    });
  });

  /**
   * CONTACT FORM TESTS
   * These tests validate the behavior of the contact form API,
   * ensuring correct handling of valid and invalid user input.
   */
  describe('POST /api/contact', () => {

    it('accepts a valid submission', async () => {
      // Send a valid contact form submission
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Abebe Kebede',
          email: 'abebe@example.com',
          message: 'Test message'
        });

      // Expect a successful response
      expect(res.status).toBe(200);

      // Confirm the backend acknowledges success
      expect(res.body.success).toBe(true);
    });

    it('rejects missing fields', async () => {
      // Send incomplete data (missing email and message)
      const res = await request(app)
        .post('/api/contact')
        .send({ name: 'Abebe' });

      // Backend should reject invalid input
      expect(res.status).toBe(400);
    });

    it('rejects invalid email', async () => {
      // Send a submission with an invalid email format
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Abebe',
          email: 'invalid',
          message: 'Hello'
        });

      // Backend validation should fail
      expect(res.status).toBe(400);
    });
  });
});

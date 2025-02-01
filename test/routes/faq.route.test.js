const request = require('supertest');
const express = require('express');
const faqRouter = require('../../src/routes/faq.route');
const { validateFAQ } = require('../../src/middlewares/validation');

describe('FAQ Routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/faqs', faqRouter);

  it('POST /api/faqs should validate request body', async () => {
    const response = await request(app)
      .post('/api/faqs')
      .send({ invalid: 'body' });
    
    expect(response.status).to.equal(400);
    expect(response.body.error).to.include('Invalid request body');
  });
});
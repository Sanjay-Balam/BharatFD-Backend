const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/config/database');
const redis = require('../../src/config/cache');

describe('FAQ API Integration', () => {
  beforeEach(async () => {
    await prisma.fAQ.deleteMany();
    await redis.del('faqs:*');
  });

  it('should create and retrieve FAQ', async () => {
    // Create
    const createRes = await request(app)
      .post('/api/faqs')
      .send({ question: 'Test', answer: 'Answer' });
    
    expect(createRes.status).to.equal(201);
    
    // Retrieve
    const getRes = await request(app)
      .get('/api/faqs?lang=hi');
    
    expect(getRes.status).to.equal(200);
    expect(getRes.body[0].question).to.include('Test');
  });
});
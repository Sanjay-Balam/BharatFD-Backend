const { expect } = require('chai');
const sinon = require('sinon');
const prisma = require('../../src/config/database');
const redis = require('../../src/config/cache');
const { createFAQ, getFAQs } = require('../../src/services/faq.service');

describe('FAQ Service', () => {
  afterEach(() => sinon.restore());

  describe('createFAQ', () => {
    it('should create FAQ with translations', async () => {
      const mockTx = {
        fAQ: { create: sinon.stub().resolves({ id: '1' }) },
        fAQTranslation: { create: sinon.stub().resolves({}) }
      };
      sinon.stub(prisma, '$transaction').callsFake(cb => cb(mockTx));
      sinon.stub(redis, 'del').resolves();

      const result = await createFAQ('Test', 'Answer');
      
      expect(mockTx.fAQ.create.calledOnce).to.be.true;
      expect(redis.del.calledWith('faqs:*')).to.be.true;
    });
  });

  describe('getFAQs', () => {
    it('should return cached data when available', async () => {
      const cachedData = [{ id: '1', question: 'Cached' }];
      sinon.stub(redis, 'get').resolves(JSON.stringify(cachedData));

      const result = await getFAQs('en');
      expect(result).to.deep.equal(cachedData);
    });
  });
});
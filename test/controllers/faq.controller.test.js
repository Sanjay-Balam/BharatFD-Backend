const { expect } = require('chai');
const sinon = require('sinon');
const { createFaq, getFaqs } = require('../../src/controllers/faq.controller');
const { createFAQ, getFAQs } = require('../../src/services/faq.service');

describe('FAQ Controller', () => {
  let req, res, statusStub, jsonStub;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis()
    };
    statusStub = res.status;
    jsonStub = res.json;
  });

  afterEach(() => sinon.restore());

  describe('createFaq', () => {
    it('should return 201 on successful creation', async () => {
      const mockFaq = { id: '1', question: 'Test', answer: 'Answer' };
      sinon.stub(createFAQ).resolves(mockFaq);
      req.body = { question: 'Test', answer: 'Answer' };

      await createFaq(req, res);
      
      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(mockFaq)).to.be.true;
    });
  });

  describe('getFaqs', () => {
    it('should return cached FAQs with default language', async () => {
      const mockFaqs = [{ id: '1', question: 'Cached' }];
      sinon.stub(getFAQs).resolves(mockFaqs);

      await getFaqs(req, res);
      
      expect(jsonStub.calledWith(mockFaqs)).to.be.true;
    });
  });
});
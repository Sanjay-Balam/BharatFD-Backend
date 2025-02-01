import express from "express"
import faqController from '../controllers/faqController';

const router = express.Router();

router.get('/faqs', faqController.getFAQs);
router.get('/faqs/:id', faqController.getFAQById);
router.post('/faqs', faqController.createFAQ);
router.put('/faqs/:id', faqController.updateFAQ);
router.delete('/faqs/:id', faqController.deleteFAQ);

export default router;
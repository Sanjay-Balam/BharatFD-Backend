import express from 'express';
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq
} from '../controllers/faq.controller';
import { validateFAQ } from '../middlewares/validation';

const router = express.Router();

router.get('/', getFaqs);
router.post('/', validateFAQ, createFaq);
//@ts-ignore
router.put('/:id', validateFAQ, updateFaq);
router.delete('/:id', deleteFaq);

export default router;
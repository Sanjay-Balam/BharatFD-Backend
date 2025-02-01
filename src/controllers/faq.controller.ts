import { Request, Response } from 'express';
import { createFAQ, getFAQs, updateFAQ, deleteFAQ } from '../services/faq.service';

export const createFaq = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const result = await createFAQ(question, answer);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
};

export const getFaqs = async (req: Request, res: Response) => {
  try {
    const lang = req.query.lang as string || 'en';
    const faqs = await getFAQs(lang);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
};

export const updateFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    
    if (!question && !answer) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const updatedFaq = await updateFAQ(id, { question, answer });
    res.json(updatedFaq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
};

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteFAQ(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
};
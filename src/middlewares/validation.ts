import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

export const validateFAQ = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    faqSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid request body' });
  }
};
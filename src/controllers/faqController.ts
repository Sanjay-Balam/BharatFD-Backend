import { Request, Response } from 'express';
import faqService from '../services/faqService';

const getFAQs = async (req: Request, res: Response) => {
    const lang = req.query.lang as string;
    const faqs = await faqService.getAllFAQs(lang);
    res.json(faqs);
};

const getFAQById = async (req: Request, res:Response) => {
    const {id} = req.params;
    const lang = req.query.lang as string;
    const faq = await faqService.getFAQById(id,lang);
    res.json(faq);
}

const createFAQ = async (req: Request, res: Response) => {
    const faq = await faqService.createFAQ(req.body);
    res.status(201).json(faq);
}

const updateFAQ = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFAQ = await faqService.updateFAQ(id, req.body);
    res.json(updatedFAQ);
};

const deleteFAQ = async (req: Request, res: Response) => {
    const { id } = req.params;
    await faqService.deleteFAQ(id);
    res.status(204).send();
};

export default { getFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ };
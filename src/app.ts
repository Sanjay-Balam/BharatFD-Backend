import express from 'express';
import faqRouter from './routes/faq.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/faqs', faqRouter);
app.use(errorHandler);

export default app;
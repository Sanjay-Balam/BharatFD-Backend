import prisma from '../config/database';
import redis from '../config/cache';
import { translateText } from './translate.service';
import config from '../config/env';

const CACHE_EXPIRATION = 3600;

export const createFAQ = async (question: string, answer: string) => {
  return await prisma.$transaction(async (tx) => {
    const faq = await tx.fAQ.create({
      data: { question, answer, language: 'en' }
    });

    const translations = await Promise.all(
      config.TARGET_LANGUAGES.map(async (lang) => {
        const [tQuestion, tAnswer] = await Promise.all([
          translateText(question, lang).catch(() => question),
          translateText(answer, lang).catch(() => answer)
        ]);

        return tx.fAQTranslation.create({
          data: {
            faqId: faq.id,
            language: lang,
            question: tQuestion,
            answer: tAnswer
          }
        });
      })
    );

    await redis.del('faqs:*');
    return { ...faq, translations };
  });
};

export const getFAQs = async (lang: string = 'en') => {
  const cacheKey = `faqs:${lang}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const faqs = await prisma.fAQ.findMany({
    include: { translations: true }
  });

  const processed = await Promise.all(faqs.map(async (faq) => {
    const translation = faq.translations.find(t => t.language === lang);
    if (translation) return translation;

    if (lang !== 'en') {
      const [question, answer] = await Promise.all([
        translateText(faq.question, lang),
        translateText(faq.answer, lang)
      ]);

      await prisma.fAQTranslation.create({
        data: {
          faqId: faq.id,
          language: lang,
          question,
          answer
        }
      });

      return { ...faq, question, answer };
    }

    return faq;
  }));

  await redis.set(cacheKey, JSON.stringify(processed), 'EX', CACHE_EXPIRATION);
  return processed;
};

export const updateFAQ = async (id: string, data: { question?: string; answer?: string }) => {
  return await prisma.$transaction(async (tx) => {
    const updatedFAQ = await tx.fAQ.update({
      where: { id },
      data: {
        question: data.question,
        answer: data.answer
      }
    });

    if (data.question || data.answer) {
      await Promise.all(config.TARGET_LANGUAGES.map(async (lang) => {
        const [tQuestion, tAnswer] = await Promise.all([
          data.question ? translateText(data.question, lang) : undefined,
          data.answer ? translateText(data.answer, lang) : undefined
        ]);

        return tx.fAQTranslation.upsert({
          where: { faqId_language: { faqId: id, language: lang } },
          update: {
            question: tQuestion || undefined,
            answer: tAnswer || undefined
          },
          create: {
            faqId: id,
            language: lang,
            question: tQuestion || updatedFAQ.question,
            answer: tAnswer || updatedFAQ.answer
          }
        });
      }));
    }

    await redis.del('faqs:*');
    return updatedFAQ;
  });
};

export const deleteFAQ = async (id: string) => {
  await prisma.fAQ.delete({ where: { id } });
  await redis.del('faqs:*');
};
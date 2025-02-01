import prisma from "../config/database";
import redis from "../config/cache";
import translateText from "../utils/translate";

const getAllFAQs = async (lang: string = 'en') =>  {
    const cacheKey = `faqs:${lang}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) return JSON.parse(cachedData);

    const faqs = await prisma.fAQ.findMany({
        include: { translations: true },
    });

    await redis.set(cacheKey, JSON.stringify(faqs), 'EX', 3600);
    return faqs;  
}

const getFAQById = async (id: string, lang: string = 'en') => {
    const faq = await prisma.fAQ.findUnique({ where: { id }, include: { translations: true } });
    return faq;
};

const createFAQ = async (data: any) => {
    const newFAQ = await prisma.fAQ.create({ data });
    return newFAQ;
};

const updateFAQ = async (id: string, data: any) => {
    return await prisma.fAQ.update({ where: { id }, data });
};
  
  const deleteFAQ = async (id: string) => {
    return await prisma.fAQ.delete({ where: { id } });
};

export default { getAllFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ };

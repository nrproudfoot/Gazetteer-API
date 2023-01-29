import { Secrets } from '../secrets/secrets.enum';

const baseUrl = 'https://newsapi.org/v2';
const key = Secrets.NewsKey;

export const getNewsByCode = (code: string): string => 
    `${baseUrl}/top-headlines?country=${code}&language=en&apiKey=${key}`;
export const getNewsBySlug = (slug: string): string =>
    `${baseUrl}/everything?q=${slug}&sortBy=publishedAt&language=en&apiKey=${key}`; 
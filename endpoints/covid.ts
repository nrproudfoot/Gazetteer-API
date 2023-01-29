const baseUrl = 'https://api.covid19api.com/total/country';

export const getCovid = (code: string): string =>
    `${baseUrl}/${code}`
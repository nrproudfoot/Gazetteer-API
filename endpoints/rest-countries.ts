const baseUrl = 'https://restcountries.com/v2/alpha';

export const getRestCountry = (code: string): string =>
    `${baseUrl}/${code}`;
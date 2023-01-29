import { formatCountryName } from '../utils';

const baseUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';

export const getWikiUrl = (country: string) => {
    return `${baseUrl}${formatCountryName(country)}`
}
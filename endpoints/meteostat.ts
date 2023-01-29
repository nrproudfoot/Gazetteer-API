import { Secrets } from '../secrets/secrets.enum';

const baseUrl = 'https://api.meteostat.net/v2/point/climate';
const key = Secrets.MeteostatKey;

export const getClimate = (lat: string, lng: string): string =>
    `${baseUrl}?lat=${lat}&lon=${lng}&key=${key}`;
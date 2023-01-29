import { Secrets } from '../secrets/secrets.enum';

const baseUrl = 'http://api.geonames.org';
const user = Secrets.GeonamesUser;

export const getCountryCode = (lat: string, lng: string ): string => 
    `${baseUrl}/countryCode?&lat=${lat}&lng=${lng}&username=${user}`;

export const getCountryInfo = (code: string): string =>
    `${baseUrl}/countryInfoJSON?formatted=true&country=${code}&username=${user}&style=full`;

export const getCapitalData = (capital: string): string => 
    `${baseUrl}/wikipediaSearch?q=${capital}&maxRows=1&type=json&username=${user}`;

export const getEarthquakes = (north: number, south: number, east: number, west: number): string => 
    `${baseUrl}/earthquakesJSON?north=${Number(north).toFixed(1)}&south=${Number(south).toFixed(1)}&east=${Number(east).toFixed(1)}&west=${Number(west).toFixed()}&maxRows=15&username=${user}`;
import { Secrets } from '../secrets/secrets.enum';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const id = Secrets.OpenWeather;

export const getWeather = (lat: string, lng: string): string => 
    `${baseUrl}?lat=${Number(lat).toFixed(1)}&lon=${Number(lng).toFixed(1)}&units=metric&appid=${id}`;
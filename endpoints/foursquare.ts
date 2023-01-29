import { Secrets } from '../secrets/secrets.enum';

interface ICategory {
    id: string;
    sort?: number;
}

const baseUrl = 'https://api.foursquare.com/v2/venues/explore';
const id = Secrets.FoursquareID;
const secret = Secrets.FoursquareSecret;
const categories: ICategory[] = [
    { id: '4deefb944765f83613cdba6e', sort: 1 },
    { id: '52e81612bcbc57f1066b7a21' },
    { id: '4d4b7105d754a06374d81259' },
    { id: '4bf58dd8d48988d116941735' }
]

const getUrl = (slug: string, category: string, sortBy?: number): string => 
    `${baseUrl}?near=${slug}&locale=en&categoryId=${category}&limit=15${sortBy ? '&sortByPopularity=' + sortBy : ''}&client_id=${id}&client_secret=${secret}&v=20210101`;

const getLocalUrl = (lat: string, lng: string, category: string, sortBy?: number): string => 
    `${baseUrl}?ll=${lat},${lng}&radius=15000&categoryId=${category}&limit=15${sortBy ? '&sortByPopularity=' + sortBy : ''}&client_id=${id}&client_secret=${secret}&v=20210101`;

export const getFoursquareUrls = (slug: string): string[] => 
    categories.map(({ id, sort }: ICategory) =>  sort ? getUrl(slug, id, sort) : getUrl(slug, id));

export const getFoursquareLocalUrls = (lat: string, lng: string): string[] =>
    categories.map(({ id, sort }: ICategory) => sort ? getLocalUrl(lat, lng, id, sort) : getLocalUrl(lat, lng, id));
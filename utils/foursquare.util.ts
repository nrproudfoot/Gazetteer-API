import { IVenue } from '../models/data.model';
import { IFoursquareVenueResponse } from '../models/responses.model';

export const formatVenue = ({ venue }: IFoursquareVenueResponse): IVenue => ({
    id: venue.id,
    name: venue.name,
    lat: venue.location.lat,
    lng: venue.location.lng,
    address: venue.location.formattedAddress,
    category: venue.categories[0].name,
    icon: `${venue.categories[0].icon.prefix}bg_32${venue.categories[0].icon.suffix}`
})
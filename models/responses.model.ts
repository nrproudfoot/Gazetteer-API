export interface IFoursquareVenueResponse {
    reasons: {
        count: number;
        items: {
            summary: string;
            type: string;
            reasonName: string;
        }[];
    };
    venue: {
        id: string;
        name: string;
        location: {
            address: string;
            lat: number;
            lng: number;
            labeledLatLngs: {
                label: string;
                lat: number;
                lng: number;
            }[];
            postalCode: string;
            cc: string;
            city: string;
            state: string;
            country: string;
            formattedAddress: string[];
        };
        categories: {
            id: string;
            name: string;
            pluralName: string;
            shortName: string;
            icon: {
                prefix: string;
                suffix: string;
            };
            primary: boolean;
        }[];
        photos: {
            count: number;
            groups: unknown[]
        }
    };
    referralId: string;
}

export interface ICovidResponse {
    Country: string;
    CountryCode: string;
    Province: string;
    City: string;
    CityCode: string;
    Lat: string;
    Lon: string;
    Confirmed: number;
    Deaths: number;
    Recovered: number;
    Active: number;
    Date: string;
    Comment: string;
}
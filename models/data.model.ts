export interface IVenue {
    id: string;
    name: string;
    lat: number;
    lng: number;
    address: string[];
    category: string;
    icon: string;
}

export interface ICovid {
    latest: {
        confirmed: number;
        deaths: number;
        weeklyConfirmed: number;
        weeklyDeaths: number;
        dailyAverage: number;
        dailyDeaths: number;
    };
    daily: {
        cases: number;
        deaths: number;
        date: string;
    }[]
}
import { ICovid } from '../models/data.model';
import { ICovidResponse } from '../models/responses.model';

export const formatCovid = (covid: ICovidResponse[]): ICovid | undefined => {
    if (!covid) return undefined;
    covid.reverse();
    return {
        latest: {
            confirmed: covid[0].Confirmed,
            deaths: covid[0].Deaths,
            weeklyConfirmed: covid[0].Confirmed - covid[6].Confirmed,
            weeklyDeaths: covid[0].Deaths - covid[6].Deaths,
            dailyAverage: (covid[0].Confirmed - covid[6].Confirmed) / 7,
            dailyDeaths: (covid[0].Deaths - covid[6].Deaths) / 7
        },
        daily: covid.slice(0, 14).map((data, index) => ({
            cases: index !== 13 ? data.Confirmed - covid[index + 1].Confirmed : 0,
            deaths: index !== 13 ? data.Deaths - covid[index + 1].Deaths : 0,
            date: data.Date
        })).slice(0, 13)
    }
} 
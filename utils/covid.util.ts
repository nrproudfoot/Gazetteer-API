import { ICovid } from '../models/data.model';
import { ICovidResponse } from '../models/responses.model';

export const formatCovid = (covid: ICovidResponse[]): ICovid => ({
    latest: {
        confirmed: covid.reverse()[0].Confirmed,
        deaths: covid.reverse()[0].Deaths,
        weeklyConfirmed: covid.reverse()[0].Confirmed - covid.reverse()[6].Confirmed,
        weeklyDeaths: covid.reverse()[0].Deaths - covid.reverse()[6].Deaths,
        dailyAverage: covid.reverse()[0].Confirmed - covid.reverse()[6].Confirmed / 7,
        dailyDeaths: covid.reverse()[0].Deaths - covid.reverse()[6].Confirmed / 7
    },
    daily: covid.reverse().slice(0, 14).map((data, index) => ({
        cases: index !== 13 ? data.Confirmed - covid.reverse()[index + 1].Confirmed : 0,
        deaths: index !== 13 ? data.Deaths - covid.reverse()[index + 1].Deaths : 0,
        date: data.Date
    })).slice(0, 13)
}) 
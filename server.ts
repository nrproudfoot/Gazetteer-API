import axios from 'axios';
import {
  getCapitalData,
  getClimate,
  getCountryCode,
  getCountryInfo,
  getCovid,
  getEarthquakes,
  getFoursquareLocalUrls,
  getFoursquareUrls,
  getNewsByCode,
  getNewsBySlug,
  getRestCountry,
  getWeather,
  getWikiUrl,
} from './endpoints';
import {
  IBoandaryQuery,
  ICodeQuery,
  ILatLngQuery,
  ISlugQuery,
  IWikiQuery,
  IIndexedError
} from './models';
import { Secrets } from './secrets/secrets.enum';
import { formatCovid, formatVenue, getErrors } from './utils';

const express = require('express');
const app = express();

app.get(
  'country',
  async function ({ query: { lat, lng } }: { query: ILatLngQuery }, res: any) {
    try {
      const url = `${getCountryCode}?&lat=${lat}&lng=${lng}&username=${Secrets.GeonamesUser}`;
      const response = await axios.get(url);
      const data = response.data as String;
      if (data.includes('ERR')) {
        const error = data.split(':')[2];
        if (error.includes('no country code found')) {
          res.send(null);
        } else {
          res.status(500).send({ error });
        }
      } else {
        res.send(response.data);
      }
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

app.get(
  'country/news',
  async function ({ query }: { query: ICodeQuery | ISlugQuery }, res: any) {
    try {
      const url = Object.keys(query).includes('slug')
        ? getNewsBySlug((query as ISlugQuery).slug)
        : getNewsByCode((query as ICodeQuery).code);
      const response = await axios.get(url);
      res.send(response.data.articles ?? []);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

app.get(
  '/country/info',
  async function ({ query }: { query: ICodeQuery }, res: any) {
    try {
      const url = getRestCountry(query.code);
      const response = await axios.get(url);

      res.send(response.data ?? {});
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

app.get(
  '/country/location',
  async function ({ query }: { query: ILatLngQuery }, res: any) {
    try {
      const { lat, lng } = query;
      if (!lat || !lng) {
        res.status(400).send({ error: 'Invalid lat or lng' });
        return;
      }
      const urls = [getCountryCode(lat, lng), getClimate(lat, lng)];
      const failedRequests: IIndexedError[] = [];
      const requests = urls.map((url, index) =>
        axios.get(url).catch((err) => {
          failedRequests.push({ index, message: err.message });
        })
      );
      const responses = await axios.all(requests);
      const code = String(responses[0]?.data).includes('ERR')
        ? null
        : responses[0]?.data;
      const climate = responses[1]?.data;
      const response = {
        code: code ?? getErrors(0, failedRequests) ?? null,
        climate: climate ?? getErrors(1, failedRequests) ?? null,
      };
      res.send(response);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

app.get(
  '/country/getInfoByCode',
  async function ({ query }: { query: ICodeQuery }, res: any) {
    const code = query.code;
    if (!code) {
      res.status(400).send({ error: 'Country code not provided' });
      return;
    }
    const urls = [
      getNewsByCode(code),
      getRestCountry(code),
      getCountryInfo(code),
      getCovid(code),
    ];
    const failedRequests: IIndexedError[] = [];
    const requests = urls.map((url, index) =>
      axios.get(url).catch((err) => {
        failedRequests.push({ index, message: err.message });
      })
    );
    const responses = await axios.all(requests);
    const response = {
      news: responses[0]?.data?.articles ?? getErrors(0, failedRequests) ?? [],
      rest: responses[1]?.data ?? getErrors(1, failedRequests) ?? null,
      info: responses[2]?.data ?? getErrors(2, failedRequests) ?? null,
      covid:
        formatCovid(responses[3]?.data) ?? getErrors(3, failedRequests) ?? null,
    };
    res.send(response);
  }
);

app.get(
  '/country/getInterest',
  async function ({ query }: { query: ISlugQuery }, res: any) {
    const slug = query.slug;
    if (!slug) {
      res.status(400).send({ error: 'Country slug not provided' });
      return;
    }
    const failedRequests: IIndexedError[] = [];
    const requests = getFoursquareUrls(slug).map((url, index) =>
      axios.get(url).catch((err) => {
        failedRequests.push({ index, message: err.message });
      })
    );
    const responses = await axios.all(requests);
    const response = {
      reccomended:
        responses[0]?.data.response.groups[0].items.map(formatVenue) ??
        getErrors(0, failedRequests) ??
        [],
      parks:
        responses[1]?.data.response.groups[0].items.map(formatVenue) ??
        getErrors(1, failedRequests) ??
        [],
      food:
        responses[2]?.data.response.groups[0].items.map(formatVenue) ??
        getErrors(2, failedRequests) ??
        [],
      bars:
        responses[3]?.data.response.groups[0].items.map(formatVenue) ??
        getErrors(3, failedRequests) ??
        [],
    };
    res.send(response);
  }
);

app.get(
  '/country/wikiInfo',
  async function (
    { query: { country, capital } }: { query: IWikiQuery },
    res: any
  ) {
    if (!country && !capital) {
      res.status(400).send({ error: 'Country and capital not provided' });
      return;
    }
    const failedRequests: IIndexedError[] = [];
    const requests = [getWikiUrl(country), getCapitalData(capital)].map(
      (url, index) =>
        axios.get(url).catch((err) => {
          failedRequests.push({ index, message: err.message });
        })
    );
    const responses = await axios.all(requests);
    const response = {
      country: responses[0]?.data ?? getErrors(0, failedRequests) ?? null,
      capital: responses[1]?.data ?? getErrors(1, failedRequests) ?? null,
    };
    res.send(response);
  }
);

app.get(
  '/country/earthquakes',
  async function (
    { query: { north, south, east, west } }: { query: IBoandaryQuery },
    res: any
  ) {
    try {
      const response = await axios.get(
        getEarthquakes(north, south, east, west)
      );
      res.send(response.data ?? null);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

app.get(
  '/local/interest',
  async function ({ query: { lat, lng } }: { query: ILatLngQuery }, res: any) {
    if (!lat || !lng) {
      res.status(400).send({ error: 'Latitude and longitude not provided' });
      return;
    }
    const failedRequests: IIndexedError[] = [];
    const requests = getFoursquareLocalUrls(lat, lng).map((url, index) =>
      axios.get(url).catch((err) => {
        failedRequests.push({ index, message: err.message });
      })
    );
    const responses = await axios.all(requests);
    const response = {
      reccomended:
        responses[0]?.data.response.groups[0].items.map(formatVenue) ??
        getErrors(0, failedRequests) ??
        [],
      parks:
        responses[1]?.data.response.groups[0].items.map(formatVenue) ??
        getErrors(1, failedRequests) ??
        [],
      food:
        responses[2]?.data.response.groups[0].items.map(formatVenue) ??
        getErrors(2, failedRequests) ??
        [],
      bars:
        responses[3]?.data.response.groups[0].items.map(formatVenue) ??
        getErrors(3, failedRequests) ??
        [],
    };
    res.send(response);
  }
);

app.get(
  '/local/weather',
  async function ({ query: { lat, lng } }: { query: ILatLngQuery }, res: any) {
    try {
      if (!lat || !lng) {
        res.status(400).send({ error: 'Latitude and longitude not provided' });
        return;
      }
      const response = await axios.get(getWeather(lat, lng));
      res.send(response?.data ?? null);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

app.listen(process.env.PORT || 8080);

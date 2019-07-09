import { CountryRegionData } from 'react-country-region-selector';
const URI = `${process.env.REACT_APP_BACKEND_URL}/`;

export const replaceStaticUrl = (url) => {
  const replaceExps = [
    {
      key: 'http://backend/',
      value: URI,
    },
    {
      key: 'static',
      value: 'backend-static',
    },
    {
      key: 'media',
      value: 'backend-media',
    },
  ];
  return replaceExps.reduce((url, it) => url.replace(it.key, it.value), url);
}

export const getAllCountries = () => CountryRegionData.map(
  (country) => {
    const states = country[2]
      .split('|')
      .map((nameWithCode) => (
        {
          name: nameWithCode.split("~")[0],
          slug: nameWithCode.split("~")[1],
          id: nameWithCode.split("~")[1],
        }
      ));
    return {
      name: country[0],
      slug: country[1],
      id: country[1],
      states: states,
    }
  }
).reduce((acc, it) => {
  acc.countries = acc.countries.concat(it);
  if(it.slug == "IN") {
    acc.defaultCountry = {...it};
  }
  return acc;
}, {
  countries: [],
  defaultCountry: {}
})
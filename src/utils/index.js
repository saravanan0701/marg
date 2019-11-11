import { CountryRegionData } from 'react-country-region-selector';
import gql from 'graphql-tag';

const LOAD_PRODUCT_TYPES = gql`
  query LoadProductTypes {
    productTypes(first: 10){
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const LOAD_DAIRY_PRODUCT = gql`
  query loadProductWithDiary($productType: ID!) {
    products(filter: {productType: $productType}, first: 1){
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const URI = `${process.env.REACT_APP_BACKEND_URL}/`;

export const replaceStaticUrl = (url) => {
  if(!url) {
    return;
  }
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
});

export const checkIfSameAddress = (address1, address2) => {
  const address1Keys = Object.keys(address1);
  const address2Keys = Object.keys(address2);
  if(address1Keys.length !== address2Keys.length) {
    return false;
  }
  return address1Keys.reduce((acc, it) => {
    if(acc === false) {
      return false;
    }
    if(it === "country" || it === "id") {
      return true;
    }
    if(!address1[it] && !address2[it]) {
      return true;
    }
    return address1[it] && address2[it] && address1[it].toLowerCase() === address2[it].toLowerCase()
  }, true)
}

export const getEditorName = (editors) => (
  editors
    .reduce(
      (acc, {name}={}) => {
        if(name) {
          return acc ? acc + " , " + name: name;
        }
      }, ""
    )
);

export const getParamsObjFromString = (queryString) => (
  queryString.slice(1).split('&').map(q => q.split('=')).reduce((a, c) => { a[c[0]] = c[1]; return a; }, {})
);

export const getLocalizedAmount = ({ currency, inr, usd }) => (
  currency === "INR"? inr: usd
)

export const getLocalizedAmountBySymbol = ({currency, amount}) => (
  currency === "INR"? `₹${amount}`: `$${amount}`
)

export const getDiaryId = (client) => {
  const getDiaryProductType = () => (
    client.query({
      query: LOAD_PRODUCT_TYPES,
    }).then(({data: {productTypes}}, error) => {
      if(error) {
        return null;
      }
      return productTypes.edges.reduce((acc, {node: {id, name} }) => {
        if(!acc) {
          return name === "Diary"?{id, name}: null
        }
        return acc;
      }, null)
    })
  )
  const getDiaryDetails = (diaryProductTypeId) => (
    client.query({
      query: LOAD_DAIRY_PRODUCT,
      variables: {
        productType: diaryProductTypeId,
      }
    }).then(({data: {products}}, error, loading) => {

      if(!error && !loading) {
        return products.edges.reduce((acc, {node: {id}}) => id?id: acc, null)
      }
    })
  )
  return new Promise((resolve, reject) => {
    getDiaryProductType().then((diaryType) => {
      if(diaryType) {
        getDiaryDetails(diaryType.id)
          .then((diaryId) => resolve(diaryId))
          .catch(() => reject())
      } else {
        reject();
      }
    }).catch(() => reject())
  })
}
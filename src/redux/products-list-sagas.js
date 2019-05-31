import { takeLatest, call, put, select } from "redux-saga/effects";
import gql from 'graphql-tag';

import actions from './../actions';

const LOAD_PRODUCTS = gql`
  query LoadProducts($query:String, $productTypeName: String, $attributes:[AttributeScalar], $sortBy:String, $first:Int!, $after:String) {
    products(query:$query, productType_Name:$productTypeName, attributes:$attributes, sortBy:$sortBy, first:$first, after:$after) {
      totalCount
      edges {
        node {
          id
          name
          price {
            amount
            currency
          }
          thumbnailUrl
          attributes{
            attribute{
              name
            }
            value {
              name
            }
          }
        }
      }

      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const getProductsListFromState = (state) => state.productList

export function* loadProducts() {
  yield takeLatest("LOAD_PRODUCTS", loadProductsFromBackend);
}

function runProductsListQuery({ client, productsList }) {
  const {
    filter: {
      attributes,
      productType,
    },
    sortBy,
    pagination: {
      first,
      after
    },
  } = productsList;
  const getHyphenLowerCase = (value) => (value.toLowerCase().replace(/\ /g, '-'));

  const queryAttributes = [];
  attributes.forEach((it) => {
    queryAttributes.push(`${getHyphenLowerCase(it.type)}:${getHyphenLowerCase(it.filter.name)}`);
  });
  return client.query({
    query: LOAD_PRODUCTS,
    variables: {
      first,
      after,
      productTypeName: productType && productType.name,
      attributes: queryAttributes,
      sortBy: sortBy && sortBy.val,
    }
  });
}


function* loadProductsFromBackend({ client }) {
  try {
    const productsList = yield select(getProductsListFromState);
    const {
      data: {
        products: {
          edges,
          pageInfo,
        }
      }
    } = yield call(runProductsListQuery, {
      client,
      productsList
    });

    const products = edges.map((productEdge) => productEdge.node);
    
    console.log();

    yield put(
      actions.replaceProducts({
        products,
        pagination: {
          after: pageInfo.endCursor,
          hasNextPage: pageInfo.hasNextPage,
        }
      })
    );
  
  } catch (e) {
    console.log("ERROR: ", e);
    yield put(actions.loginFailure());
  }
}
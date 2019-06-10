import { takeLatest, call, put, select } from "redux-saga/effects";
import gql from 'graphql-tag';

import actions from './../actions';
import client from './../apollo/';

const LOAD_PRODUCTS = gql`
  query LoadProducts($query:String, $categoryIds: [ID], $attributes:[AttributeScalar], $sortBy:ProductOrder, $first:Int!, $after:String) {
    products(query:$query, categories:$categoryIds, attributes:$attributes, sortBy:$sortBy, first:$first, after:$after) {
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
  yield takeLatest([
    "LOAD_PRODUCTS",
    "ADD_ATTRIBUTE_FILTER",
    "REPLACE_ATTRIBUTE_FILTER",
    "REMOVE_ATTRIBUTE_FILTER",
    "ADD_CATEGORY_FILTER",
    "REMOVE_CATEGORY_FILTER",
    "ADD_SORT_BY",
    "RESET_SORT_BY",
  ], loadProductsFromBackend, {allowPagination: false});

  yield takeLatest([
    "LOAD_NEXT_PAGE",
  ], loadProductsFromBackend, {allowPagination: true});
}

function runProductsListQuery({ client, productsList, allowPagination }) {
  const {
    filter: {
      attributes,
      category,
    },
    sortBy,
    pagination: {
      first,
      after
    },
  } = productsList;
  const getHyphenLowerCase = (value) => (value.toLowerCase().replace(/\ /g, '-'));

  const queryAttributes = attributes.map((it) => (`${it.type}:${it.filter.slug}`));
  return client.query({
    query: LOAD_PRODUCTS,
    variables: {
      first,
      after: allowPagination? after: '',
      categoryIds: category && category.id? [category.id]: [],
      attributes: queryAttributes && queryAttributes.length > 0? queryAttributes: [],
      sortBy: sortBy && sortBy.val? sortBy.val: null,
      // TODO sorting...
    }
  }).then(
    (
      {
        data: {
          products: {
            edges,
            pageInfo,
          }
        }
      }
    ) => {
      const products = edges.map((productEdge) => productEdge.node);
      return {
        products,
        pageInfo,
      }
    }
  );
}


function* loadProductsFromBackend({ allowPagination }) {
  try {
    const productsList = yield select(getProductsListFromState);
    const {
      products,
      pageInfo,
    } = yield call(runProductsListQuery, {
      client,
      productsList,
      allowPagination,
    });

    if(allowPagination) {
      //If paginated, append products.
      yield put(
        actions.appendProducts({
          products,
          pagination: {
            after: pageInfo.endCursor,
            hasNextPage: pageInfo.hasNextPage,
          }
        })
      );  
    } else {
      //On app boot or if any filter has been changed, replace all products.
      yield put(
        actions.replaceProducts({
          products,
          pagination: {
            after: pageInfo.endCursor,
            hasNextPage: pageInfo.hasNextPage,
          }
        })
      );
    }
    
  
  } catch (e) {
    yield put(actions.loadProductsError());
  }
}
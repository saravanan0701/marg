import { takeLatest, call, put, select } from "redux-saga/effects";
import gql from 'graphql-tag';

import actions from './../actions';
import client from './../apollo/';

const LOAD_PRODUCTS = gql`
  query LoadProducts(
    $query:String,
    $categoryIds: [ID],
    $attributes:[AttributeScalar],
    $sortBy:ProductOrder,
    $first:Int!,
    $after:String,
    $editorIds: [ID],
    $publicationCategoryIds: [Int],
  ) {
    products(
      query:$query,
      categories:$categoryIds,
      attributes:$attributes,
      sortBy:$sortBy,
      first:$first,
      after:$after,
      editorIds: $editorIds,
      publicationCategoryIds: $publicationCategoryIds,
    ) {
      totalCount
      edges {
        node {
          id
          name
          variants{
            id
            sku
            isDigital
            inrPrice {
              amount
              currency
              localized
            }
            usdPrice {
              amount
              currency
              localized
            }
          }
          isAvailable
          thumbnailUrl(size:500)
          images{
            url
          }
          editors {
            id
            name
          }
          description
          category{
            name
          }
          attributes{
            attribute{
              name
              slug
            }
            value {
              name
            }
          }
          pageNumber
          parentSection{
            parentProduct{
              id
              name
              images{
                url
              }
              category{
                name
              }
              editors {
                id
                name
              }
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
    "REMOVE_ALL_ATTRIBUTE_FILTERS_BY_ATTRIBUTE_SLUG",
    "REMOVE_ATTRIBUTE_FILTER",
    "REPLACE_CATEGORY_FILTERS",
    "ADD_SORT_BY",
    "RESET_SORT_BY",
    "ADD_EDITOR_FILTER",
    "REPLACE_EDITOR_FILTER",
    "REMOVE_EDITOR_FILTER",
    "REMOVE_ALL_EDITOR_FILTERS",
  ], loadProductsFromBackend, {allowPagination: false});

  yield takeLatest([
    "LOAD_NEXT_PAGE",
  ], loadProductsFromBackend, {allowPagination: true});
}

function runProductsListQuery({ client, productsList, allowPagination }) {
  const {
    filter: {
      attributes,
      categories,
      editors,
    },
    sortBy,
    pagination: {
      first,
      after
    },
  } = productsList;
  const getHyphenLowerCase = (value) => (value.toLowerCase().replace(/\ /g, '-'));

  const queryAttributes = attributes.reduce(
    (acc, it) => {
      if(it.type === "year") {
        acc.attributes = acc.attributes.concat(`${it.type}:${it.filter.slug}`);
      } else {
        acc.categories = acc.categories.concat(it.filter.id)
      }
      return acc;
    }, {attributes: [], categories:[]}
  );

  const editorIds = editors.map(({id}) => id);
  return client.query({
    query: LOAD_PRODUCTS,
    variables: {
      first,
      editorIds,
      after: allowPagination? after: '',
      categoryIds: categories.map((category) => category.id),
      attributes: queryAttributes.attributes,
      sortBy: sortBy? { field: sortBy.key, direction: sortBy.val }: null,
      publicationCategoryIds: queryAttributes.categories,
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
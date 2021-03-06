import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchResults from './SearchResults';
import { Container, Row, Col } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import gql from 'graphql-tag';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  tap,
} from 'rxjs/operators';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

const SEARCH = gql`
  query LoadSearch($name: String!, $first: Int!) {
    editors(name: $name, first: $first){
      edges{
        node{
          id
          name
        }
      }
    }
    products(query: $name, first: $first){
      edges{
        node{
          id
          name
          images {
            url
          }
          category{
            id
            name
          }
          description
          inrPrice {
            amount
            currency
          }
          usdPrice {
            amount
            currency
          }
          editors{
            id
            name
          }
          isAvailable
          attributes {
            attribute {
              slug
            }
            value {
              name
            }
          }
          editors {
            name
          }
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
    }
  }
`;

const StyledWrapper = styled.div`

  min-height: 600px;
  
  input {
    padding: 10px 20px;
    outline: none;
    font-size: 22px;

    ::-webkit-input-placeholder { 
      font-size: ${props => props.theme['$font-size-xxs']};
    }

    input:-moz-placeholder { 
      font-size: ${props => props.theme['$font-size-xxs']};
    }
  }

  .editor {
    font-size: 18px;
    color: black !important;
  }
`;

const VALID_CATEGORIES = ["Books", "Magazines", "Articles"];

 const SearchResultsContainer = ({
  client,
  history: {
    push,
  },
}) => {

  const [ value, setValue ] = useState('');
  const [ noResults, setNoResults ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ searchSub$ ] = useState(new Subject());
  const [ resultsArr, setResultsArr ] = useState([]);

  useEffect(() => {
    searchSub$.pipe(
      //TODO - Do not send query if search string is blank
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => setIsLoading(true)),
      switchMap(searchQuery),
    ).subscribe((options) => {
      if(options.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setIsLoading(false)
    });

    return () => {
      searchSub$.complete();
    }
  }, [])

  function returnToPreviousPage() {
    // Redirect to page that user was on before 'Search' was clicked
  }

  const searchQuery = (searchVal) => (
    client.query({
      query: SEARCH,
      variables: {
        name: searchVal,
        first: 50,
      }
    }).then(({ data: { products: {edges: productEdges}={}, editors: {edges: editorEdges}={} }={} }={}, error) => {
      if(!error || error.length === 0) {
        const getCategoryOb = (arr, id) => arr.find(({id: categoryId}) => categoryId === id)
        let categoriesArr = productEdges.reduce((acc, edge) => {
          const product = {...edge.node, url: `/product/${edge.node.id}`};
          const category = {...product.category};
          delete product.category;
          const existingCategory = getCategoryOb(acc, category.id);
          if(existingCategory) {
            existingCategory.items = existingCategory.items.concat(product);
            return acc;
          } else if(VALID_CATEGORIES.find((catName) => catName === category.name)) {
            category.items = [product];
            return acc.concat(category);
          }
          return acc;
        }, []);
        if(editorEdges && editorEdges.length > 0) {
          categoriesArr = categoriesArr.concat({
            id: "editors",
            name: "Editors",
            items: editorEdges.map(({node}) => ({...node, url: `/categories/?editor-id=${node.id}`}))
          });
        }
        setResultsArr(categoriesArr);
        return categoriesArr;
      }
    })
  );

  const handleInputChange = (event) => {
    searchSub$.next(event.target.value);
    setValue(event.target.value);
  }

  return (
    <StyledWrapper id="searchResults" className="py-5 mt-5">
      <Container>
        <Row>
          <Col xs="12" lg="7" className="mx-auto">
            <input  ref={input => input && input.focus()}
              onChange={(event) => handleInputChange(event)} 
              type="text"
              className="w-100"
              placeholder="Search for magazines, articles, books and editors"
            />
            { isLoading && value.length !=0 && <LinearProgress color="secondary" /> }
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row>
          <Col xs="12" lg="10" className="mx-auto text-center">
            { 
              value.length !=0 && noResults &&
              <div>
                <h4>Oops! We didn't find anything matching your query</h4>
                <h5>Try searching for something else</h5> 
              </div>
            }
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="10" className="mx-auto">
            { !isLoading && value.length != 0 && <SearchResults resultsArr={resultsArr} />}
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  )
}

export default withApollo(withRouter(SearchResultsContainer));



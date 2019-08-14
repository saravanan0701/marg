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
          thumbnail(size:10){
            url
          }
          category{
            id
            name
          }
        }
      }
    }
  }
`;

const StyledWrapper = styled.div`
  
  input {
    padding: 10px 20px;
    outline: none;

    ::-webkit-input-placeholder { 
      color: #000000;
      font-size: 14px;
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    input:-moz-placeholder { 
      color: #000000;
      font-size: 14px;
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
    }
  }

`;

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
        first: 10,
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
          } else {
            category.items = [product];
            return acc.concat(category);
          }
        }, []);
        if(editorEdges && editorEdges.length > 0) {
          console.log(editorEdges);
          categoriesArr = categoriesArr.concat({
            id: "editors",
            name: "Editors",
            items: editorEdges.map(({node}) => ({...node, url: `/categories/?editor-id=${node.id}`}))
          });
        }
        console.log(categoriesArr);
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
    <StyledWrapper id="searchResults" className="py-5">
      <Container>
        <Row>
          <Col xs="12" lg="7" className="mx-auto">
            <input 
              onChange={(event) => handleInputChange(event)} 
              type="text"
              className="w-100"
              placeholder="Search"
            />
            { isLoading && <LinearProgress color="secondary" /> }
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row>
          <Col xs="12" lg="10" className="mx-auto text-center">
            { 
              value.length !=0 && noResults &&
              <div>
                <h5>Oops! We didn't find anything matching your query</h5>
                <h4>Try searching for something else</h4> 
              </div>
            }
            { value.length == 0 && 
              <div>
                <h4>Search for magazines, articles, books and editors</h4>
                <h5>Start typing into the search field</h5>
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



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchResults from './SearchResults';
import { Container, Row, Col } from 'reactstrap';

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

  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 100;

  #close {
    cursor: pointer;
    float: right;
    #cross {
      font-size: 40px;
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
  const [ suggestions, setSuggestions ] = useState([]);
  const [ noResults, setNoResults ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ searchSub$ ] = useState(new Subject());
  const [ resultsArr, setResultsArr ] = useState([]);

  useEffect(() => {
    searchSub$.pipe(
      tap(() => setIsLoading(true)),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchQuery),
    ).subscribe((options) => {
      if(options.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setIsLoading(false)
      setSuggestions(options);
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

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <StyledWrapper id="searchResults">
      <Container>
        <Row>
          <Col>
            <input onChange={(event) => searchSub$.next(event.target.value)} type="text"/>
            <div id="close" onClick={returnToPreviousPage}>
              <span id="cross">&times;</span>
            </div>
          </Col>
        </Row>
      </Container>
      <SearchResults resultsArr={resultsArr} />
    </StyledWrapper>
  )
}

export default withApollo(withRouter(SearchResultsContainer));



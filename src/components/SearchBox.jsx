import React, { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import gql from 'graphql-tag';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  tap,
} from 'rxjs/operators';
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

const Container = styled.div`
  margin-right: 0px;
  position: relative;

  input {
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

    padding: 10px 20px;
    padding-right: 40px;

    outline: none;
    border: none;

  }

  #searchIcon {
    position: absolute;
    right: 5%;
  }

  .no-results{
    position: absolute;
    left: 0px;
    top: 100%;
    text-transform: capitalize;
    font-weight: 300;
    width: 280px;
    border: 1px solid #aaa;
    padding: 10px 20px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

const SearchBox = ({
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

  const escapeRegexCharacters = (str) => (str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => (<div>{suggestion.name}</div>);

  const renderSectionTitle = (section) => (<strong>{section.name}</strong>);

  const getSectionSuggestions = (section) => (section.items)

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
          const product = {...edge.node};
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
          categoriesArr = categoriesArr.concat({
            id: "editors",
            name: "Editors",
            items: editorEdges.map(({node}) => ({...node}))
          });
        }
        return categoriesArr;
      }
    })
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = (ob) => {
    searchSub$.next(ob.value);
  };

  const suggestionSelected = (e, {  suggestion, sectionIndex }) => {
    if(suggestions[sectionIndex].name === "Magazines" || suggestions[sectionIndex].name === "Books") {
      return push(`/product/${suggestion.id}`);
    } else if(suggestions[sectionIndex].name === "Editors") {
      return push(`/categories/?editor-id=${suggestion.id}`);
    }
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    value,
    onChange,
    placeholder: 'Search',
    onBlur: () => setIsLoading(false),
  };

  return (
    <Container className="search d-flex align-items-center">
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
        onSuggestionSelected={suggestionSelected}
      />
      {
        noResults &&
          <div className="no-results">No Results</div>
      }
      {
        isLoading ?
          <FontAwesome id="searchIcon" name='spinner' spin className='color-red' />:
          <FontAwesome id="searchIcon" name='search' className='color-red' />

      }
    </Container>
  );
}

export default withApollo(withRouter(SearchBox));
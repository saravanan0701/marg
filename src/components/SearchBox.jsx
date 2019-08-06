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

  input {
    ::-webkit-input-placeholder { 
      text-align:right;
      color: #000000;
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    input:-moz-placeholder { 
      text-align:right;
      color: #000000;
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    padding: 10px 20px;
    padding-right: 40px;

    outline: none;
    border: none;

    background-color: #f8f8f8;
  }

  #searchIcon {
    position: absolute;
    right: 5%;
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
  let searchSub$;

  useEffect(() => {
    searchSub$ = new Subject();
    

    return () => {
      searchSub$.complete();
    }
  }, [])

  const escapeRegexCharacters = (str) => (str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => (<div>{suggestion.name}</div>);

  const renderSectionTitle = (section) => (<strong>{section.name}</strong>);

  const getSectionSuggestions = (section) => (section.items)

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    // searchSub$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap(searchData),
    // ).subscribe((options) => {
    //   this.setState({ options })

    // });
  };

  const onSuggestionsFetchRequested = (ob) => {
    client.query({
      query: SEARCH,
      variables: {
        name: ob.value,
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
        categoriesArr = categoriesArr.concat({
          id: "editors",
          name: "Editors",
          items: editorEdges.map(({node}) => ({...node}))
        })
        setSuggestions(categoriesArr);
      }
    })
  };

  const suggestionSelected = (e, {  suggestion, sectionIndex }) => {
    if(suggestions[sectionIndex].name === "Magazines" || suggestions[sectionIndex].name === "Books") {
      return push(`/product/${suggestion.id}`);
    }
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    value,
    onChange,
    placeholder: 'Search',
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
      <FontAwesome id="searchIcon" name='search' className='color-red' />
    </Container>
  );
}

export default withApollo(withRouter(SearchBox));
import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';


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

const SearchBox = ({client}) => {

  const languages = [
    {
      title: '1970s',
      languages: [
        {
          name: 'C',
          year: 1972
        }
      ]
    },
    {
      title: '1980s',
      languages: [
        {
          name: 'C++',
          year: 1983
        },
        {
          name: 'Perl',
          year: 1987
        }
      ]
    },
    {
      title: '1990s',
      languages: [
        {
          name: 'Haskell',
          year: 1990
        },
        {
          name: 'Python',
          year: 1991
        },
        {
          name: 'Java',
          year: 1995
        },
        {
          name: 'Javascript',
          year: 1995
        },
        {
          name: 'PHP',
          year: 1995
        },
        {
          name: 'Ruby',
          year: 1995
        }
      ]
    },
    {
      title: '2000s',
      languages: [
        {
          name: 'C#',
          year: 2000
        },
        {
          name: 'Scala',
          year: 2003
        },
        {
          name: 'Clojure',
          year: 2007
        },
        {
          name: 'Go',
          year: 2009
        }
      ]
    },
    {
      title: '2010s',
      languages: [
        {
          name: 'Elm',
          year: 2012
        }
      ]
    }
  ];


  const [ value, setValue ] = useState('');
  const [ suggestions, setSuggestions ] = useState([]);

  const escapeRegexCharacters = (str) => (str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages
      .map(section => {
        return {
          title: section.title,
          languages: section.languages.filter(language => regex.test(language.name))
        };
      })
      .filter(section => section.languages.length > 0);
  };

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => (<div>{suggestion.name}</div>);

  const renderSectionTitle = (section) => (<strong>{section.title}</strong>);

  const getSectionSuggestions = (section) => (section.languages)

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = (ob) => {
    setTimeout(() => {
      setSuggestions(getSuggestions(ob.value));
    }, 1000);
  };

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
      />
      <FontAwesome id="searchIcon" name='search' className='color-red' />
    </Container>
  );
}

export default withApollo(SearchBox)
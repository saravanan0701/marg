import React, { useState, useEffect } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { withApollo } from 'react-apollo';
import { DropDown } from './../../commons/';
import { FlatButton } from '../../commons';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import FontAwesome from 'react-fontawesome';
import { getParamsObjFromString } from './../../../utils/';
import ProductListFilter from './';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    height: '90vh'
  },
}));


const MobileFilterToggleContainer = styled.div`
  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      display: none !important;
  }
`

const Wrapper = styled.div`
  div.dropdown-container {
    display: flex;
    flex-direction: column;
  }

  div.dropdown {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 60px;
    display: flex;
  }
`


export const MobileListFilterComponent = (props) => {

  const [filterOpen, setFilterState] = useState(false);
  const classes = useStyles();

  return (
    <div className="container">
      <MobileFilterToggleContainer>
        <FlatButton 
          className="my-4" 
          id="mobileFilterToggle" 
          onClick={() => setFilterState(!filterOpen)}>
            FILTERS
            <FontAwesome className="icon ml-2" name='filter' />
        </FlatButton>
      </MobileFilterToggleContainer>
      
      <SwipeableDrawer
        anchor="bottom"
        open={filterOpen}
        onClose={() => setFilterState(!filterOpen)}
        onOpen={() => setFilterState(!filterOpen)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Wrapper>
          <ProductListFilter className="dropdown-container" {...props} />
        </Wrapper>
      </SwipeableDrawer>
    </div>
  )
}

import React from 'react';
import styled from 'styled-components';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { RaisedButton } from './../commons/';
import about from './../../images/about.jpg';
import { ProductsSection } from './ProductsSection.jsx';
import { ProductCategories } from './ProductCategories.jsx';
import HeroCarousel from './HeroCarousel.jsx';

import { Container, Row, Col } from 'reactstrap';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fcf8d1;

  @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  & > .small {
    color: #000000;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-semi-bold']};
    letter-spacing: 1.18px;
    text-transform: uppercase;
  }

  & > .big {
    font-family: "Cormorant Garamond Medium";
    font-size: 32px; 

    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-lg']};
    }
    font-weight: ${props => props.theme['$weight-semi-bold']};
    letter-spacing: 1px;
    line-height: 57px;
  }
`;

const Todo = styled.div`
  text-align: center;
  font-size: 40px;
  display: block;
  width: 100%;
`

const Body = styled.div`
  /* & > div {
    padding-left: 130px;
    padding-right: 130px;
  } */
`;

const About = styled.div`

  h1 {
    color: #000000;
    font-family: "Cormorant Garamond Medium";
    font-size: ${props => props.theme['$font-size-sm']};
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-lg']};
    }
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
  }

  .body {
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
  }

  button {
    letter-spacing: 3px;
  }
`

const LIST_CATEGORIES = gql`
  query ListCategories($first: Int) {
    categories(first: $first){
      edges{
        node{
          id
          name
        }
      }
    }
  }
`;

export const Home = props => (
  <div>
    <Header className="full-width py-5 text-center">
      <div className="small">THE MARG FOUNDATION</div>
      <div className="big text-center">A Pathmaking Tradition</div>
    </Header>
    <Body>
      {/* <Todo>Issues section: TODO</Todo>
      <Todo>Blogs and events: TODO</Todo> */}
      <HeroCarousel />
      <About className="full-width bg-gray py-5 px-3 px-lg-5">
        <Container>
          <Row>
            <Col lg="7" className="text-center">
              <img className="img-fluid p-lg-5" src={about} />
            </Col>
            <Col lg="5" className="d-flex align-items-center">
              <div className="my-4">
                <h1>The Legacy of Marg</h1>
                <p className="body my-2">
                  Marg was founded by Mulk Raj Anand in 1946, with the aim of developing a
                  socially active and culturally engaging language of art.
                  Marg magazine and books have been a forum for pioneering research in Indian art
                  and are acclaimed for their standards of production and editorial content.
                </p>
                <RaisedButton className="my-3">
                  MORE ABOUT MARG
                </RaisedButton>
              </div>

            </Col>
          </Row>
        </Container>
      </About>
      <Query
        query={LIST_CATEGORIES}
        variables= {{first: 10}}
      >
        {
          ({loading, data, error}) => {
            if(loading || error) {
              return (<div>Loading..</div>);
            }
            const categories = data.categories.edges;
            const categoryOb = categories.reduce((acc, {node: {id, name}={}}) => {
              if(name.toLowerCase().match(new RegExp(/magazine/gi))) {
                acc.magazineId = id;
              }
              if(name.toLowerCase().match(new RegExp(/book/gi))) {
                acc.bookId = id;
              }
              return acc;
            }, {});
            return (
              <div>
                <ProductsSection key={1} name="Magazines" categoryId={categoryOb.magazineId} />
                <ProductsSection key={2} name="Books" categoryId={categoryOb.bookId} />
              </div>
            )

          }
        }
      </Query>
      <ProductCategories />
    </Body>
  </div>
)

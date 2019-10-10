import React from "react";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { RaisedButton } from "./../commons/";
import about from "./../../images/aboutus.jpg";
import { ProductsSection } from "./ProductsSection.jsx";
import { ProductCategories } from "./ProductCategories.jsx";
import HeroCarousel from "./HeroCarousel.jsx";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import FlatButton from "../commons/FlatButton";
import emblem from "../../images/emblem.png";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fcf8d1;

  @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  & > .small {
    color: #000000;
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: ${props => props.theme["$weight-semi-bold"]};
    letter-spacing: 1.18px;
    text-transform: uppercase;
  }

  & > .big {
    font-family: ${props => props.theme['$font-secondary-medium']};
    font-size: 32px;

    @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
      font-size: ${props => props.theme["$font-size-lg"]};
    }
    font-weight: ${props => props.theme["$weight-semi-bold"]};
    letter-spacing: 1px;
    line-height: 57px;
  }
`;

const Todo = styled.div`
  text-align: center;
  font-size: 40px;
  display: block;
  width: 100%;
`;

const Body = styled.div`
  /* & > div {
    padding-left: 130px;
    padding-right: 130px;
  } */
`;

const About = styled.div`
  h1 {
    color: #000000;
    font-family: ${props => props.theme['$font-secondary-medium']};
    font-size: ${props => props.theme["$font-size-sm"]};
    @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
      font-size: ${props => props.theme["$font-size-lg"]};
    }
    font-weight: ${props => props.theme["$weight-regular"]};
    letter-spacing: 1px;
  }

  .pathmaking {

    display: flex;
    flex-direction: row;

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;

      h2 {
        color: #000000;
        font-family: ${props => props.theme['$font-secondary-medium']};
        font-size: 21px;
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 0px;
      }

      span {
        color: #000000;
        font-family: Lato;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 1.58px;
        text-transform: uppercase;
      }
    }
  }

  .body {
    font-size: ${props => props.theme["$font-size-xxs"]};
    font-weight: ${props => props.theme["$weight-regular"]};
    letter-spacing: 0.59px;
    line-height: 23px;
  }

  a {
    color: inherit;
  }

  button {
    letter-spacing: 3px;
    a {
      color: white;
    }
  }
`;

const LIST_CATEGORIES = gql`
  query ListCategories($first: Int) {
    categories(first: $first) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const Home = props => (
  <div>
    <Body>
      {/* <Todo>Issues section: TODO</Todo>
      <Todo>Blogs and events: TODO</Todo> */}
      <HeroCarousel />
      <About className="full-width bg-gray py-5 px-3 px-lg-5">
        <Container>
          <Row>
            <Col xs="12" className="text-center my-3">
              <h1>The Legacy of Marg</h1>
            </Col>
            <Col lg="6" className="text-center">
              <img className="img-fluid" src={about} />
            </Col>
            <Col lg="6" className="d-flex align-items-center">
              <div>
                <div className="row my-3">
                  <div className="col-12 pathmaking">
                    <img className="img-fluid" src={emblem} alt="" />
                    <div className="text mx-3">
                      <h2>A Pathmaking Tradition</h2>
                      <span>SINCE 1946</span>
                    </div>
                  </div>
                </div>
                <p className="body my-2">
                  Marg was founded by Mulk Raj Anand in 1946, with the aim of
                  developing a socially active and culturally engaging language
                  of art. Marg magazine and books have been a forum for
                  pioneering research in Indian art and are acclaimed for their
                  standards of production and editorial content.
                </p>
                <RaisedButton className="my-3">
                  <Link to="/aboutus">MORE ABOUT MARG</Link>
                </RaisedButton>
                {/* <FlatButton><Link to="">HISTORICAL TIMELINE</Link></FlatButton> */}
                <FlatButton colorType="primary">
                  <Link to="/trustees">MARG TRUSTEES & ADVISORS</Link>
                </FlatButton>
              </div>
            </Col>
          </Row>
        </Container>
      </About>
      <Query query={LIST_CATEGORIES} variables={{ first: 10 }}>
        {({ loading, data, error }) => {
          if (loading || error) {
            return <div>Loading..</div>;
          }
          const categories = data.categories.edges;
          const categoryOb = categories.reduce(
            (acc, { node: { id, name } = {} }) => {
              if (name.toLowerCase().match(new RegExp(/magazine/gi))) {
                acc.magazineId = id;
              }
              if (name.toLowerCase().match(new RegExp(/book/gi))) {
                acc.bookId = id;
              }
              return acc;
            },
            {}
          );
          return (
            <div>
              <ProductsSection
                key={1}
                name="Magazines"
                categoryId={categoryOb.magazineId}
                slug="magazines"
              />
              <ProductsSection
                key={2}
                name="Books"
                categoryId={categoryOb.bookId}
                slug="books"
              />
            </div>
          );
        }}
      </Query>
      <ProductCategories />
    </Body>
  </div>
);

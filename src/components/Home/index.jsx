import React from 'react';
import styled from 'styled-components';

import { RaisedButton } from './../commons/';
import about from './../../images/about.jpg';
import { ProductsSection } from './ProductsSection.jsx';
import { ProductCategories } from './ProductCategories.jsx';

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
    font-size: ${props => props.theme['$font-size-lg']};
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
  & > div {
    padding-left: 130px;
    padding-right: 130px;
  }
`;

const About = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.sectionBackground};
  height: 80vh;
  padding-top: 72px;
  padding-bottom: 72px;

  & > .img-container {
    width: 55%;
    display: flex;
    flex-direction: row;

    & > img {
      height: 100%;
      object-position: top;
      object-fit: cover;
    }
  }

      h1 {
      color: #000000;
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
    }

    .body {
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;
      padding: 35px 0px;
    }

  & > .text-section {
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 5% 0px 0% 5%;


  }
`

export const Home = props => (
  <div>
    <Header className="full-width py-5">
      <div className="small">THE MARG FOUNDATION</div>
      <div className="big">A Pathmaking Tradition</div>
    </Header>
    <Body>
      <Todo>Issues section: TODO</Todo>
      <Todo>Blogs and events: TODO</Todo>

      <About className="full-width bg-gray">
        <Container>
          <Row>
            <Col lg="7">
              <img className="img-fluid" src={about} />
            </Col>
            <Col lg="5" className="d-flex align-items-center">
              <div>
                <h1>The Legacy of Marg</h1>
                <p class="body">
                  Marg was founded by Mulk Raj Anand in 1946, with the aim of developing a
                  socially active and culturally engaging language of art.
                  Marg magazine and books have been a forum for pioneering research in Indian art
                  and are acclaimed for their standards of production and editorial content.
                </p>
                <RaisedButton>
                  MORE ABOUT MARG
                </RaisedButton>
              </div>

            </Col>
          </Row>
        </Container>
      </About>
      <ProductsSection>
      </ProductsSection>
      <ProductCategories>
      </ProductCategories>
    </Body>
  </div>
)

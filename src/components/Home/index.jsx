import React from 'react';
import styled from 'styled-components';

import { RaisedButton } from './../commons/';
import about from './../../images/about.jpg';
import { ProductsSection } from './ProductsSection.jsx';
import { ProductCategories } from './ProductCategories.jsx';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  background-color: ${props => props.theme.sectionBackground};

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

  & > .text-section {
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 5% 0px 0% 5%;

    & > .heading {
      color: #000000;
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
    }

    & > .body {
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;
      padding: 35px 0px;
    }
  }
`

export const Home = props => (
  <div>
    <Header>
      <div className="small">THE MARG FOUNDATION</div>
      <div className="big">A Pathmaking Tradition</div>
    </Header>
    <Body>
      <Todo>Issues section: TODO</Todo>
      <Todo>Blogs and events: TODO</Todo>
      <About>
        <div className="img-container">
          <img src={about} />
        </div>
        <div className="text-section">
          <div className="heading">The Legacy of Marg</div>
          <div className="body">
            Marg was founded by Mulk Raj Anand in 1946, with the aim of developing a
            socially active and culturally engaging language of art. 
            Marg magazine and books have been a forum for pioneering research in Indian art
            and are acclaimed for their standards of production and editorial content.
          </div>
          <RaisedButton>
            MORE ABOUT MARG
          </RaisedButton>
        </div>
      </About>
      <ProductsSection>
      </ProductsSection>
      <ProductCategories>
      </ProductCategories>
    </Body>
  </div>
)

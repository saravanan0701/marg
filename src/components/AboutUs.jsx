import React from 'react';
import styled from 'styled-components';

import { RaisedButton } from './commons/';
import { Link } from 'react-router-dom';
import aboutUs from './../images/aboutus.png';

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;

  & > div.header {
    padding: 100px 100px 100px;
    
    img {
      width: 100%;
      height: 100%;
    }

    div.sub-header {
      display: flex;
      flex-direction: row;
      padding-top: 20px;

      div.title {
        width: 40%;
        font-family: "Cormorant Garamond Medium";
        font-size: ${props => props.theme['$font-size-lg']};
        font-weight: ${props => props.theme['$weight-regular']};
      }

      div.description {
        width: 60%;

        & button {
          margin-top: 15px;
        }
      }
    }
  }

  div.footer {
    padding: 75px 130px;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: row;

    & > .img-container {
      width: 60%;
      
      & > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    & > div.content {
      display: flex;
      flex-direction: column;
      padding: 70px 0px 30px 50px;
      width: 40%;

      & > .header {
        font-family: "Cormorant Garamond Medium";
        font-size: ${props => props.theme['$font-size-lg']};
        font-weight: ${props => props.theme['$weight-regular']};
        padding-bottom: 30px;
      }

      & > .body {
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-regular']};
        padding-bottom: 30px;
      }
    }
  }
`;


export const AboutUs = props => (
  <Wrapper>
    <div className="header">
      <img src={aboutUs} />
      <div className="sub-header">
        <div className="title">The Marg Foundation</div>
        <div className="description">
          <p>
            Marg's aim is to develop a socially active and culturally engaging language of art. Marg magazine and books have been a forum for pioneering research in Indian art and are acclaimed for their standards of production and editorial content.
            <br /><br />
            Marg’s books, published simultaneously with the magazine from 1977 to 2009, have since diverged into independent publications, each a landmark contribution.
            <br /><br />
            We have also produced thought-provoking documentary films on India’s architectural heritage and changing urban spaces.
          </p>
          <Link to="team" className="link button">
            <RaisedButton colorType="primary">The Marg Team</RaisedButton>
          </Link>
        </div>
      </div>
    </div>
    <div className="footer">
      <div className="img-container">
        <img src={aboutUs} />
      </div>
      <div className="content">
        <div className="header">Historical Timeline</div>
        <div className="body">
          Marg began as a magazine in 1946 and was founded by scholar-writer-activist Mulk Raj Anand along with a group of art critics and architects which included Karl Khandalavala, Anil de Silva and Minnette de Silva. With seven ads and two rooms provided by the visionary industrialist J.R.D. Tata, it took up the massive task of identifying, analysing and advancing the artistic heritage of a newly independent nation, guided by the spirit of humanism, socialism and internationalism.
        </div>
        <Link to="history" className="link button">
          <RaisedButton colorType="primary">Our History</RaisedButton>
        </Link>
      </div>
    </div>
  </Wrapper>
)
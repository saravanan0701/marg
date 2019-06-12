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
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet auctor nunc, ut feugiat neque. Aliquam pretium condimentum nunc eu accumsan. Phasellus ut laoreet metus, quis convallis dolor. Phasellus pulvinar convallis felis sed iaculis. Morbi cursus dapibus ligula, non euismod velit blandit id. Quisque tempus justo justo, eu elementum metus eleifend nec. Sed at nisi in lorem consectetur rutrum.
          </div>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet auctor nunc, ut feugiat neque. Aliquam pretium condimentum nunc eu accumsan. Phasellus ut laoreet metus, quis convallis dolor. Phasellus pulvinar convallis felis sed iaculis. Sed at nisi in lorem consectetur rutrum.
        </div>
        <Link to="history" className="link button">
          <RaisedButton colorType="primary">Our History</RaisedButton>
        </Link>
      </div>
    </div>
  </Wrapper>
)
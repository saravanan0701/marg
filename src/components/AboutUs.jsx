import React from 'react';
import styled from 'styled-components';

import {RaisedButton} from './commons/';
import {Link} from 'react-router-dom';
import Team from './../images/team.jpg';
import Timeline from './../images/timeline.jpg';

const Wrapper = styled.div`

    .hero-img {
      width: 100%;
      height: 100%;
      max-height: 650px;
      object-fit: cover;
    }


      h1.title {
        font-family: ${props => props.theme['$font-secondary-medium']};
        font-size: ${props => props.theme['$font-size-lg']};
        font-weight: ${props => props.theme['$weight-regular']};
      }


  div.history {
    padding: 75px 1.5rem;
    background-color: #f8f8f8;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
     
      .history-image {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    div.content {

      .header {
        font-family: ${props => props.theme['$font-secondary-medium']};
        font-size: ${props => props.theme['$font-size-lg']};
        font-weight: ${props => props.theme['$weight-regular']};
        padding-bottom: 30px;
      }

      .body {
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-regular']};
        padding-bottom: 30px;
      }
    }
  }
`;


export const AboutUs = props => (
    <Wrapper>
        <div className="container my-5">
            <img className="hero-img" src={Team}/>
            <div className="row mt-5">
                <div className="col-12 col-md-4"><h1 className="title">The Marg Foundation</h1></div>
                <div className="col-12 col-md-6 description">
                    <p>
                        Marg's aim is to develop a socially active and culturally engaging language of art. Marg
                        magazine and books have been a forum for pioneering research in Indian art and are acclaimed for
                        their standards of production and editorial content.
                        <br/><br/>
                        Marg’s books, published simultaneously with the magazine from 1977 to 2009, have since diverged
                        into independent publications, each a landmark contribution.
                        <br/><br/>
                        We have also produced thought-provoking documentary films on India’s architectural heritage and
                        changing urban spaces.
                    </p>
                    <Link to="team" className="link button">
                        <RaisedButton colorType="primary">The Marg Team</RaisedButton>
                    </Link>
                </div>
            </div>
        </div>
        <div className="history full-width">
          <div className="container">
            <div className="row">
                <div className="img-container col-12 col-md-6">
                    <img className="history-image" src={Timeline}/>
                </div>
                <div className="content col-12 col-md-5 px-lg-5">
                    <div><h2 className="header">Historical Timeline</h2></div>
                    <div className="body">
                        Marg began as a magazine in 1946 and was founded by scholar-writer-activist Mulk Raj Anand along
                        with a group of art critics and architects which included Karl Khandalavala, Anil de Silva and
                        Minnette de Silva. With seven ads and two rooms provided by the visionary industrialist J.R.D.
                        Tata,
                        it took up the massive task of identifying, analysing and advancing the artistic heritage of a
                        newly
                        independent nation, guided by the spirit of humanism, socialism and internationalism.
                    </div>
                    <Link to="history" className="link button">
                        <RaisedButton colorType="primary">Our History</RaisedButton>
                    </Link>
                </div>
            </div>
          </div>
        </div>
    </Wrapper>
)
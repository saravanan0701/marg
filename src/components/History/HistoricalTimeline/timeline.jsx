import React,{ Fragment } from 'react'
import {  Row, Col } from "reactstrap";
import styled from 'styled-components';
import { Link, animateScroll } from 'react-scroll'
import FoundingMagazineBackgroungImg from '../../../images/Ourhistory/Bitmap.png';
import MulkRajAnand from '../../../images/Ourhistory/0.png';
import FirstIssue  from '../../../images/Ourhistory/01.png';
import MargCommunity  from '../../../images/Ourhistory/02.png';
import Architecture  from '../../../images/Ourhistory/03.png';

const Wrapper = styled.div`

  padding:2%;
  & h6{
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.18px;
    text-transform: uppercase;
  }
  & h2{
    color: #000000;
    font-family: "Cormorant Medium";
    font-size: 42px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 57px;
  }

  & section {
    padding:0;
    background-image:url(${FoundingMagazineBackgroungImg});
    width:100%;
    height:100%;  
    .layer {
      background-color: rgba(252, 248, 209,0.95);
      width: 100%;
      height: 100%;
      padding:2% 10% 0%;
  }
  }

  & h1{
    color: #ec1d24;
    font-family: "Cormorant Medium";
    font-size: 3.5rem;
    font-weight: 500;
    letter-spacing: 1.36px;
    line-height: 57px;
    margin:2rem 0;
  }
  .founded{
    padding: 15% 10%;
    @media (max-width: 768px) {
    padding:3%;
    }
    h6{
      color: #3a3a3a;
      font-family: Lato;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

`;

const HistoricalTimeline = ( ) => {
  
  return(
      <Fragment>
        {/* Founded by Mulk Raj Anand */}
          <Wrapper>
            <div className="text-center py-5"> 
              <h6>The Marg Foundation</h6>
              <h2>A Historical Timeline</h2>
            </div>
            <section>
              <div className="layer">
                <h1 className="text-center pb-5">Founding the Magazine</h1>
              <Row className="pb-5">
                <Col md='6'>
                  <div className="text-left founded">
                    <h6>
                      Founded by Mulk Raj Anand
                    </h6>
                    <p>
                    The beginnings of Marg are inextricably linked with the inception of free India—writer-activist Mulk Raj Anand founded Marg magazine in 1946 
                    to stimulate popular interest in and appreciation of art and architecture in India.
                    </p>
                    <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} style={{cursor:'pointer'}}> <b><span className="text-danger">NEXT</span> <span className="text-dark">- Our First Issue</span></b></Link>
                  </div>
                </Col>
                <Col md="6">
                    <img src={MulkRajAnand} width="85%" height="100%" className="image-fluid" />
                </Col>
              </Row>
              </div>
            </section>
          </Wrapper>
          
        {/* Our First Issue */}

        <Wrapper>
            <section name="test1" className="element" >
              <div className="layer">
                <h1 className="text-center pb-5">Founding the Magazine</h1>
              <Row>
                <Col md='6'>
                  <div className="text-left founded">
                    <h6>
                      Our First Issue
                    </h6>
                    <p>
                    Marg in Sanskrit translates as “pathway”. The magazine’s early issues were a radical forum to
                    nurture/ further ideas for nation-building through the prism of culture.
                    </p>
                    <Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500} style={{cursor:'pointer'}}><b><span className="text-danger">NEXT</span> <span className="text-dark">- A Global Marg Community</span></b></Link>
                  </div>
                </Col>
                <Col md="6">
                    <img src={FirstIssue} width="85%" height="80%" className="image-responsive" />
                </Col>
              </Row>
              </div>
            </section>
          </Wrapper>

          {/* A Global MARG Community */}
          <Wrapper>

            <section name="test2" className="element">
              <div className="layer">
                <h1 className="text-center pb-5">Founding the Magazine</h1>
              <Row>
                <Col md='6'>
                  <div className="text-left founded">
                    <h6>
                    A GLOBAL MARG COMMUNITY 
                    </h6>
                    <p>
                    Fourteen visionaries joined Mulk in founding Marg, they not only came from different countries and cultures but represented varied fields. Most notably, 
                    it was the patronage of leading industrialist J.R.D. Tata that cemented the foundations of Marg.
                    </p>
                    <Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} style={{cursor:'pointer'}}><b><span className="text-danger">NEXT</span> <span className="text-dark">- Pioneering Issues - Focus on Architecture </span></b></Link>
                  </div>
                </Col>
                <Col md="6">
                    <img src={MargCommunity} width="85%" height="80%" className="image-fluid" />
                </Col>
              </Row>
              </div>
            </section>
          </Wrapper>

          {/*  Focus On Architecture */}

          <Wrapper>
            <section name="test3" className="element">
              <div className="layer">
                <h1 className="text-center pb-5">Founding the Magazine</h1>
              <Row>
                <Col md='6'>
                  <div className="text-left founded">
                    <h6>
                    FOCUS ON ARCHITECTURE
                    </h6>
                    <p>
                    The leading architects of the world wrote significant texts in Marg’s issues that set forth the agenda for architecture in India. 
                    Marg championed two of India’s landmark urban projects—the formation of the cities of Chandigarh and New Bombay.
                    </p>
                    <a href="#"><b><span className="text-danger">NEXT</span> <span className="text-dark"></span></b></a>
                  </div>
                </Col>
                <Col md="6">
                    <img src={Architecture} width="85%" height="80%" className="image-fluid" />
                </Col>
              </Row>
              </div>
            </section>
          </Wrapper>
      </Fragment>
  )
}
export default HistoricalTimeline
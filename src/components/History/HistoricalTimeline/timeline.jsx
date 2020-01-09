import React,{ Component,Fragment } from 'react'
import {  Row, Col } from "reactstrap";
import styled from 'styled-components';
import { Link, animateScroll } from 'react-scroll';
import FlatButton from "../../commons/FlatButton";
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


class HistoricalTimeline extends Component {

  constructor(props){
    super(props);
    this.state = {
      historyTimeline : [
        [
          {
          header : "Founded by Mulk Raj Anand",
          description : "The beginnings of Marg are inextricably linked with the inception of free India—writer-activist Mulk Raj Anand founded Marg magazine in 1946 to stimulate popular interest in and appreciation of art and architecture in India.",
          imageSource : MulkRajAnand
          },
          {
          header : "Our First Issue",
          description : "Marg in Sanskrit translates as “pathway”. The magazine’s early issues were a radical forum to nurture/ further ideas for nation-building through the prism of culture.",
          imageSource : FirstIssue
          },
          {
          header : "A GLOBAL MARG COMMUNITY",
          description : "Fourteen visionaries joined Mulk in founding Marg, they not only came from different countries and cultures but represented varied fields. Most notably, it was the patronage of leading industrialist J.R.D. Tata that cemented the foundations of Marg.",
          imageSource : MargCommunity
          },
          {
          header : "FOCUS ON ARCHITECTURE",
          description : "The leading architects of the world wrote significant texts in Marg’s issues that set forth the agenda for architecture in India.Marg championed two of India’s landmark urban projects—the formation of the cities of Chandigarh and New Bombay.",
          imageSource : Architecture
          }
        ],
        [
          {
          header : "Founded by Mulk Raj Anand",
          description : "The beginnings of Marg are inextricably linked with the inception of free India—writer-activist Mulk Raj Anand founded Marg magazine in 1946 to stimulate popular interest in and appreciation of art and architecture in India.",
          imageSource : MulkRajAnand
          },
          {
          header : "Our First Issue",
          description : "Marg in Sanskrit translates as “pathway”. The magazine’s early issues were a radical forum to nurture/ further ideas for nation-building through the prism of culture.",
          imageSource : FirstIssue
          },
          {
          header : "A GLOBAL MARG COMMUNITY",
          description : "Fourteen visionaries joined Mulk in founding Marg, they not only came from different countries and cultures but represented varied fields. Most notably, it was the patronage of leading industrialist J.R.D. Tata that cemented the foundations of Marg.",
          imageSource : MargCommunity
          },
          {
          header : "FOCUS ON ARCHITECTURE",
          description : "The leading architects of the world wrote significant texts in Marg’s issues that set forth the agenda for architecture in India.Marg championed two of India’s landmark urban projects—the formation of the cities of Chandigarh and New Bombay.",
          imageSource : Architecture
          }
        ],
        [
          {
          header : "Founded by Mulk Raj Anand",
          description : "The beginnings of Marg are inextricably linked with the inception of free India—writer-activist Mulk Raj Anand founded Marg magazine in 1946 to stimulate popular interest in and appreciation of art and architecture in India.",
          imageSource : MulkRajAnand
          },
          {
          header : "Our First Issue",
          description : "Marg in Sanskrit translates as “pathway”. The magazine’s early issues were a radical forum to nurture/ further ideas for nation-building through the prism of culture.",
          imageSource : FirstIssue
          },
          {
          header : "A GLOBAL MARG COMMUNITY",
          description : "Fourteen visionaries joined Mulk in founding Marg, they not only came from different countries and cultures but represented varied fields. Most notably, it was the patronage of leading industrialist J.R.D. Tata that cemented the foundations of Marg.",
          imageSource : MargCommunity
          },
          {
          header : "FOCUS ON ARCHITECTURE",
          description : "The leading architects of the world wrote significant texts in Marg’s issues that set forth the agenda for architecture in India.Marg championed two of India’s landmark urban projects—the formation of the cities of Chandigarh and New Bombay.",
          imageSource : Architecture
          }
        ],
        [
          {
          header : "Founded by Mulk Raj Anand",
          description : "The beginnings of Marg are inextricably linked with the inception of free India—writer-activist Mulk Raj Anand founded Marg magazine in 1946 to stimulate popular interest in and appreciation of art and architecture in India.",
          imageSource : MulkRajAnand
          },
          {
          header : "Our First Issue",
          description : "Marg in Sanskrit translates as “pathway”. The magazine’s early issues were a radical forum to nurture/ further ideas for nation-building through the prism of culture.",
          imageSource : FirstIssue
          },
          {
          header : "A GLOBAL MARG COMMUNITY",
          description : "Fourteen visionaries joined Mulk in founding Marg, they not only came from different countries and cultures but represented varied fields. Most notably, it was the patronage of leading industrialist J.R.D. Tata that cemented the foundations of Marg.",
          imageSource : MargCommunity
          },
          {
          header : "FOCUS ON ARCHITECTURE",
          description : "The leading architects of the world wrote significant texts in Marg’s issues that set forth the agenda for architecture in India.Marg championed two of India’s landmark urban projects—the formation of the cities of Chandigarh and New Bombay.",
          imageSource : Architecture
          }
        ],
      ],
      currentIndex : [0,1,2,3],
    }
  }

  handleToggle = (i) =>{
    let temp_currentIndex = this.state.currentIndex;

    temp_currentIndex[i] = temp_currentIndex[i]+1 < this.state.historyTimeline[i].length ? temp_currentIndex[i]+1 : 0;

    this.setState({
      currentIndex : temp_currentIndex
    })
  }

  render(){
    let { historyTimeline , currentIndex } = this.state;
    return(
        <Fragment>
          <div className="text-center py-5">
            <h6>The Marg Foundation</h6>
            <h2>A Historical Timeline</h2>
          </div>
          {
            historyTimeline.map((data,i) => {
              return(
                <Wrapper>
                  <section>
                    <div className="layer">
                      <h1 className="text-center pb-5">Founding the Magazine</h1>
                    <Row className="pb-5">
                      <Col md='6'>
                        <div className="text-left founded">
                          <h6>
                            {data[currentIndex[i]].header}
                          </h6>
                          <p>
                          {
                            data[currentIndex[i]].description
                          }
                          </p>
                          <FlatButton onClick={()=>{this.handleToggle(i)}}>NEXT<b><span className="text-dark"> - {data[(currentIndex[i]+1)%data.length].header}</span></b></FlatButton>
                        </div>
                      </Col>
                      <Col md="6">
                          <img src={data[currentIndex[i]].imageSource} width="85%" height="100%" className="image-fluid" style= {{ objectFit : "cover" }} />
                      </Col>
                    </Row>
                    </div>
                  </section>
                </Wrapper>
              )
            })
          }

        </Fragment>
    )
  }

}
export default HistoricalTimeline

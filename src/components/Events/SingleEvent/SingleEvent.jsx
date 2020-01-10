import React from "react";
import { Row,Col } from 'reactstrap';
import styled from 'styled-components'
import EventImage from "../../../images/events.png";

const Event = styled.div`
padding : 0rem 6rem;
.EventTitle{
  color: #000000;
  font-family: Lato;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.66px;
  line-height: 23px;
}
.EventInfo{
  color: #3a3a3a;
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.59px;
  line-height: 23px;
}
.EventDesc{
  color: #000000;
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.59px;
  line-height: 23px;
}
@media (max-width: 768px) {
  padding : 0rem 2rem;
  }
`;

const data = {
  "type": "Lecture",
  "title": "The Story of India's Unicorns",
  "venue": "Mumbai",
  "date": "Friday, August 31, 2019 ",
  "time": "6.00 to 7.30 pm",
  "description": "A lecture by Divyabhanusinh, Asok Kumar Das, and Shibani Bose to celebrate the release of The Story of India's Unicorns",
};

const SingleEvent = () =>{

  return(
    <Event>
      <Row>
        <Col md="12" className="mt-5">
          <div>
          <img style= {{ objectFit : "cover" }} src={EventImage} width="100%" height="100%"  className="img-fluid"/>
          <div className="my-4">
            <p className="EventTitle">{data.type} | {data.title}</p>
            <span className="EventInfo">{data.venue} : {data.date}</span><br/>
            <span className="EventInfo">{data.time}</span>
            <p className="EventDesc pt-4">{data.description}</p>
          </div>
          <br/>
          </div>
       </Col>
      </Row>
    </Event>
  );
}

export default SingleEvent;

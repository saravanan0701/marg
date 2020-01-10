import React from "react";
import { Row,Col } from 'reactstrap';
import styled from 'styled-components'
import FlatButton from "../commons/FlatButton";
import EventImage from "../../images/events.png";
import { Link } from "react-router-dom";

const SingleEvent = styled.div`
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

const EventList = ({ data }) =>{

  return(
    <SingleEvent>
      <Row>
      {data.map((events,index) =>
        <Col md="6" className="mt-5">
          <img style= {{ objectFit : "cover" }} src={EventImage} width="100%" height="100%" className="img-fluid"/>
          <div className="my-4">
          <p className="EventTitle">{events.type} | {events.title}</p>
          <span className="EventInfo">{events.venue} : {events.date}</span><br/>
          <span className="EventInfo">{events.time}</span>
          <p className="EventDesc pt-4">{events.description}</p>
          <Link to="/event/1"><FlatButton>VIEW DETAILS</FlatButton></Link>
          </div>
          <br/>
       </Col>
        )}
      </Row>
    </SingleEvent>
  );
}

export default EventList;

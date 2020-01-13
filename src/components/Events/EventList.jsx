import React, { useReducer , useEffect } from "react";
import { Row,Col } from 'reactstrap';
import styled from 'styled-components'
import FlatButton from "../commons/FlatButton";
import RaisedButton from "../commons/RaisedButton";
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
.EventType{
  margin-bottom : -30px;
  color: #37312f;
  font-family: Lato;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}
@media (max-width: 768px) {
  padding : 0rem 2rem;
  }
`;

const INITIAL_STATE = {
  show_counter: 4,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'HANDLE_VIEW_MORE':
      return {
        ...state,
        show_counter : state.show_counter + 4
      }

    default:
      return state
  }
};

const EventList = ({ events , event_type }) =>{
  console.log(events);
  const [ eventState , dispatch ] = useReducer(reducer, INITIAL_STATE);

  return(
    <>
      <SingleEvent>
        <p className = "EventType">{event_type}</p>
        <Row>
        {
          events.map((event,index) =>
          index < eventState.show_counter ?
          <Col md="6" className="mt-5">
            <img style= {{ objectFit : "cover" }} src={EventImage} width="100%" height="100%" className="img-fluid"/>
            <div className="my-4">
            <p className="EventTitle">{event.type} | {event.title}</p>
            <span className="EventInfo">{event.venue} : {event.date}</span><br/>
            <span className="EventInfo">{event.time}</span>
            <p className="EventDesc pt-4">{event.description}</p>
            <Link to="/event/1"><FlatButton>VIEW DETAILS</FlatButton></Link>
            </div>
            <br/>
         </Col>:
          null
          )
        }
        </Row>
      </SingleEvent>
      {
        eventState.show_counter < events.length  ?
        <center><RaisedButton onClick={()=>{ dispatch({ type : "HANDLE_VIEW_MORE" })}}>VIEW MORE</RaisedButton></center>
        :
        null
      }
      <br/>
    </>
  );
}

export default EventList;

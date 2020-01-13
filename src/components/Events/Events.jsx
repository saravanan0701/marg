import React, { useEffect } from "react";
import EventList from "./EventList.jsx";
import styled from 'styled-components';
import RaisedButton from "../commons/RaisedButton";

const Event = styled.div`

.Title{
  color: #000000;
  font-family: "Cormorant Medium";
  font-size: 42px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 57px;
  margin-top : 75px;
  text-align : center;
}
.EventType{
  padding : 0rem 6rem;
  margin-bottom : -30px;
  color: #37312f;
  font-family: Lato;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}
@media (max-width: 768px) {
  .EventType{
    padding : 0rem 2rem;
  }
  }

`;

const Events = ({
  data,
  next_event,
  past_event,
  next_view_more,
  past_view_more,
  toggleNext,
  togglePast,
  onNext,
  onPast
}) =>{

  useEffect(()=>{
    if( data.next_event.length > next_event.length )
    {
      onNext();
    }
    if( data.past_event.length > past_event.length )
    {
      onPast();
    }
  });
  return(
    <Event>
      <p className = "Title">Marg Events</p>
      <br/><br/>
      <p className = "EventType">next event</p>
      <EventList data = {next_event} />
      {
        next_view_more ?
        <center><RaisedButton onClick={toggleNext}>VIEW MORE</RaisedButton></center>
        :
        null
      }
      <br/><br/>
      <p className = "EventType">past event</p>
      <EventList data = {past_event} />
      {
        past_view_more ?
        <center><RaisedButton onClick={togglePast}>VIEW MORE</RaisedButton></center>
        :
        null
      }
      <br/>
    </Event>
  );
};

export default Events;

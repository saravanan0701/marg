import React, { useEffect , useState } from "react";
import EventList from "./EventList.jsx";
import styled from 'styled-components';
import { eventData } from "./data";
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

`;



const Events = () =>{

  const [ next_event , handle_next_event ] = useState([]);
  const [ past_event , handle_past_event ] = useState([]);


  useEffect(()=>{
    let { next_event , past_event } = eventData;

    handle_next_event(next_event);
    handle_past_event(past_event);

  },[]);
  return(
    <Event>
      <p className = "Title">Marg Events</p>
      <br/><br/>
      <EventList
        events = {next_event}
        event_type = "next event"
      />
      <br/><br/>
      <EventList
        events = {past_event}
        event_type = "past event"
      />
    </Event>
  );
};

export default Events;

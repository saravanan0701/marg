import React from 'react'
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  background-color: ${props => props.theme[props.type? `${props.type}Color`: "primaryColor"]};
  padding: 10px 30px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  font-size: ${props => props.theme['$font-size-xxs']};
  font-weight: ${props => props.theme['$weight-bold']};
`;

const RaisedButton = (props) => (
  <ButtonWrapper {...props}>
    {props.children}
  </ButtonWrapper>
);

export default RaisedButton;
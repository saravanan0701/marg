import React from 'react'
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  background-color: ${props => props.theme[props.type? `${props.type}Color`: "primaryColor"]};
  padding: 10px 30px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
`;

export const RaisedButton = (props) => (
  <ButtonWrapper {...props}>
    {props.children}
  </ButtonWrapper>
);
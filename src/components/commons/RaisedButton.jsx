import React from 'react'
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background-color: ${props => props.theme[props.colorType? `${props.colorType}Color`: "primaryColor"]};
  padding: 10px 30px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  font-size: ${props => props.theme['$font-size-xxxs']};
  font-weight: ${props => props.theme['$weight-bold']};
  border: none;
  &:disabled {
    background-color: #cccccc;
  }
`;

const RaisedButton = (props) => (
  <ButtonWrapper {...props}>
    {props.children}
  </ButtonWrapper>
);

export default RaisedButton;
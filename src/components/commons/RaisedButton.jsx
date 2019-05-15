import React from 'react'
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  background-color: ${props => props.theme[props.type? `${props.type}Color`: "primaryColor"]};
  padding: 10px 20px;
`;

export const PrimaryButton = (props) => (
  <ButtonWrapper {...props}>
    {props.children}
  </ButtonWrapper>
);
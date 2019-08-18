import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const Button = styled.div`
	position: fixed;
	bottom: 10%;
	right: 10%;
	z-index: 100;
	background: white;
	color: red;
	width: 40px;
	height: 40px;
	border-radius: 100%;
	cursor: pointer;
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: -1px 1px 8px 0px rgba(0,0,0,0.75);
`;
export const ScrollTop = props => {
              
	return <Button onClick={(e) => window.scrollTo(0, 0)}>
		<FontAwesome name={'chevron-up'} />
	</Button>
}
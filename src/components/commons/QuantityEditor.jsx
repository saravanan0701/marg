import React, { useState } from 'react'
import styled from 'styled-components';


const Container = styled.div`
  & > .icon {
    cursor: pointer;
  }
`;

const QuantityEditor = ({ quantity, modifyQuantity }) => {
  const [ quant, setQuant ] = useState(quantity);
  const incr = () => {
    if(!modifyQuantity) {
      return setQuant(quant+1);;
    }
    modifyQuantity(quant+1).then(() => {
      setQuant(quant+1);
    })
  }
  const decr = () => {
    if(quant <= 0) {
      return;
    }
    if(!modifyQuantity) {
      return setQuant(quant-1);
    }
    modifyQuantity(quant-1).then(() => {
      setQuant(quant-1);
    })
  }
  return <Container className="row col-md-4">
    <div onClick={decr} className="col-4 icon">-</div>
    <div className="col-4">{quant}</div>
    <div onClick={incr} className="col-4 icon">+</div>
  </Container>;
}

export default QuantityEditor;
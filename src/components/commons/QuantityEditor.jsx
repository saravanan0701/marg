import React, { useState } from 'react'
import styled from 'styled-components';
import plus from '../../images/plus.svg';
import minus from '../../images/minus.svg';


const QuantityEditorWrapper = styled.div`

  /* width: 110px; */
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #4a4a4a;
  padding: 8px 0px;

  .icon, .quantity {
    display: flex;
    cursor: pointer;
    width: 35%;
    justify-content: center;
    align-items: center;
  }

  .quantity {
    color: #4a4a4a;
    font-family: Lato;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
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
  return (

    <QuantityEditorWrapper>
      <div onClick={decr} className="icon"><img src={minus} alt=""/></div>
      <div className="quantity">{quant}</div>
      <div onClick={incr} className="icon"><img src={plus} alt=""/></div>
    </QuantityEditorWrapper>
  )
}

export default QuantityEditor;
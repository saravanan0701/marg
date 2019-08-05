import React, { useState } from 'react'


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
  return <div>
    <div onClick={decr}>-</div>
    {quant}
    <div onClick={incr}>+</div>
  </div>;
}

export default QuantityEditor;
import React from 'react';
import styled from 'styled-components';
import { FlatButton } from '../../commons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 30px;
  & > div {
    margin-left: 50px;

    &.active {
      border-bottom: 1px solid ${props => props.theme.primaryColor};
    }
  }
`;

export const ProductTypeFilterComponent = ({
  productType, 
  selectProductType, 
  availableProductTypes 
}) => {
  
  const menus = [
    <FlatButton
      key="0"
      onMouseDown={() => selectProductType(null)}
      className={!productType? 'active': ''}
      type="secondary"
      >
      View All
    </FlatButton>
  ];

  availableProductTypes.forEach(
    (productTypeIt, id) => menus.push(
      <FlatButton key={id + 1}
        onMouseDown={() => selectProductType({
          name: productTypeIt.name,
          id: productTypeIt.id,
        })}
        className={productType && productType.id === productTypeIt.id? 'active': ''}
        type="secondary"
      >
        {productTypeIt.name}
      </FlatButton>
    )
  );

  return (
    <Wrapper>
      { menus.map((menu) => menu) }
    </Wrapper>
  )
}

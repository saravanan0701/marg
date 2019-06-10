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

export const CategoryFilterComponent = ({
  category, 
  selectCategory, 
  categories 
}) => {
  
  const menus = [
    <FlatButton
      key="0"
      onMouseDown={() => selectCategory(null)}
      className={!category? 'active': ''}
      type="secondary"
      >
      View All
    </FlatButton>
  ];

  categories.forEach(
    (categoryIt, id) => menus.push(
      <FlatButton key={id + 1}
        onMouseDown={() => selectCategory({
          name: categoryIt.name,
          id: categoryIt.id,
        })}
        className={category && category.id === categoryIt.id? 'active': ''}
        type="secondary"
      >
        {categoryIt.name}
      </FlatButton>
    )
  );

  return (
    <Wrapper>
      { menus.map((menu) => menu) }
    </Wrapper>
  )
}

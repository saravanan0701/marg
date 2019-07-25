import React, { Component } from 'react'
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const MenuWrapper = styled.div`

  cursor: pointer;
  font-size: ${props => props.theme['$font-size-xxs']};
  font-weight: ${props => props.theme['$weight-regular']};
  letter-spacing: 3px;
  text-transform: uppercase;
  border: none;
  position: relative;
  display: inline-block;

  & > div.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #000000;

    & > .icon {
      color: ${props => props.theme.primaryColor};
      font-size: 12px;
    }
  }

  & > div.body {
    position: absolute;
    top: 100%;
    right: 0px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: max-content;
    border: 1px solid #9d9d9d;
    padding: 10px;
    background: white;

    & > a {
      color: #000000;
      text-align: right;
    }
  }
`;

class Menu extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.mouseHoveredIn = this.mouseHoveredIn.bind(this);
    this.mouseHoveredOut = this.mouseHoveredOut.bind(this);
    this.optionSelected = this.optionSelected.bind(this);
  }

  mouseHoveredIn() {
    this.setState({
      isOpen: true,
    })
  }

  mouseHoveredOut() {
    this.setState({
      isOpen: false,
    })
  }

  optionSelected() {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    const {
      label,
      children,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    return (
      <MenuWrapper
        onMouseEnter={this.mouseHoveredIn}
        onMouseLeave={this.mouseHoveredOut}
        {...this.props}
        >
        <div className="header">
          <div>{label}</div>
          {
            isOpen?
              <FontAwesome className="icon ml-1" name='chevron-up' />
              :
              <FontAwesome className="icon ml-1" name='chevron-down' />
          }
        </div>
        {
          isOpen &&
            <div onClick={this.optionSelected} className="body">
              { children }
            </div>
        }
      </MenuWrapper>
    );
  }
}

export default Menu;
import React, { Component } from 'react'
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const MenuWrapper = styled.div`

  cursor: pointer;
  font-size: ${props => props.theme['$font-size-xxxs']};
  font-weight: ${props => props.theme['$weight-regular']};
  letter-spacing: 3px;
  text-transform: uppercase;
  border: none;
  position: relative;
  display: inline-block;

  div.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #000000;

    & > .icon {
      color: ${props => props.theme.primaryColor};
      font-size: 12px;
    }
  }
  
  .dropdown-spacing-container {
    padding-top:35px;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 15;
  }

  div.menu-dropdown-container {
    display: flex;
    flex-direction: column;
    width: max-content;
    border: 1px solid #9d9d9d;
    padding: 20px;
    background: white;

    a {
      color: #000000;
      text-align: left;
      padding: 5px 0;
    }
     a:hover {
      color: ${props => props.theme.primaryColor};
      text-align: left;
      padding: 5px 0;
    }
    a.active {
        border-bottom: 1px solid ${props => props.theme["primaryColor"]};
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
        <div className="header" onClick={this.props.directLink}>
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
              <div className="dropdown-spacing-container">
            <div onClick={this.optionSelected} className="menu-dropdown-container">
              { children }
            </div>
              </div>
        }
      </MenuWrapper>
    );
  }
}

export default Menu;
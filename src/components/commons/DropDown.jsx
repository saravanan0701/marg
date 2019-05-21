import React, { Component } from 'react'
import styled, { css } from 'styled-components';
import FontAwesome from 'react-fontawesome';

const Wrapper = styled.div`

  position: relative;
  width: fit-content;

  & > .label {
    background: transparent;
    border: none;
    border-bottom: 1px solid #979797;
    font-weight: ${props => props.theme['$weight-bold']};
    font-size: ${props => props.theme['$font-size-xxs']};
    letter-spacing: 3px;
    text-transform: uppercase;
    outline: none;
    color: ${props => props.theme.secondaryColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 0px 10px;

    & > .icon {
      color: ${props => props.theme.primaryColor};
      padding-left: 50px;
    }
  }

  & > .options {
    z-index: 1;
    position: absolute;
    background: white;
    border: 1px solid #9d9d9d;
    padding: 15px;
    width: 100%;
    font-size: 14px;
  }
`;

class DropDown extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showBody: false,
    }
    this.labelClicked = this.labelClicked.bind(this);
  }

  labelClicked() {
    this.setState({
      showBody: !this.state.showBody,
    })
  }

  render() {
    const {
      showBody,
    } = this.state;

    return (
      <Wrapper {...this.props}>
        <button className="label" onClick={this.labelClicked} onBlur={this.labelClicked}>
          <div>Label</div>
          {
            showBody?
              <FontAwesome className="icon" name='chevron-up' />
              :
              <FontAwesome className="icon" name='chevron-down' />
          }

        </button>
        {
          showBody &&
          <div className="options">
            {this.props.children}
          </div>
        }
      </Wrapper>
    );
  }
}
export default DropDown;
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

  & > div.body {

    z-index: 1;
    padding: 15px 10px;
    background: white;
    border: 1px solid #9d9d9d;
    font-size: 14px;

    & > input {
      border: 1px solid #979797;
      background-color: #f8f8f8;
      padding: 10px;
      color: ${props => props.theme.primaryColor};
      
      &::placeholder {
        color: ${props => props.theme.primaryColor};
        font-size: ${props => props.theme['$font-size-xxs']};
        font-weight: ${props => props.theme['$weight-medium']};
      }
      
      &:focus::placeholder {
        color: grey;
      }
    }
    
    & > .options {
      background: white;
      padding: 15px;
      width: 100%;
      font-size: 14px;
      padding: 15px 5px 0px;
    }
  }
`;

class DropDown extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showBody: true,
      dontClose: false,
      options: [],
      error: false,
    }
    this.labelClicked = this.labelClicked.bind(this);
    this.inputFocused = this.inputFocused.bind(this);
    this.inputBlurred = this.inputBlurred.bind(this);
  }

  labelClicked() {
    setTimeout(function() {
      if(this.state.dontClose){
        return;
      }
      this.setState({
        showBody: !this.state.showBody,
      });
    }.bind(this), 0);
  }

  inputFocused() {
    this.setState({
      showBody: true,
      dontClose: true,
    });
  }

  inputBlurred() {
    this.setState({
      showBody: false,
      dontClose: false,
    });
  }

  componentDidMount() {
    this
      .props
      .loadData()
      .then(
        (data) => {
          this.setState({
            options: data,
          })
        }
      )
      .catch(
        (err) => {
          this.setState({
            options: [],
            error: true,
          })
        }
      );
  }

  render() {
    const {
      showBody,
      error,
      options,
    } = this.state;
    
    const {
      enableSearch,
    } = this.props;

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
          showBody && error && 
          <div className="error">
            Error loading data
          </div>
        }
        {
          showBody && !error &&
          <div className="body">
            {
              enableSearch &&
              <input type="text" placeholder="Search" onChange={this.searchList} onFocus={this.inputFocused} onBlur={this.inputBlurred}/>
            }
            <div className="options">
              {
                options
                  .map(
                    (option) => (
                      <div>{option.name}</div>
                    )
                  )
              }
            </div>
          </div>
        }
      </Wrapper>
    );
  }
}
export default DropDown;
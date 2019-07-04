import React, { Component } from 'react'
import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div.radio-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    cursor: pointer;

    & > div.radio {
      border-radius: 100%;
      border: 1px solid #000000;
      width: 20px;
      height: 20px;
      background-color: white;
      margin-right: 10px;
      position: relative;
    }

    & > div.radio.selected:before {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -6px;
        margin-top: -6px;
        background-color: ${props => props.theme[props.colorType? `${props.colorType}Color`: "primaryColor"]};
    }

    & > div.radio-label {
      flex-grow: 1;
    }
  }
`;

class RadioButtonSet extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0,
    }
    this.selectOption = this.selectOption.bind(this);
  }

  selectOption(selectedId) {
    this.setState({
      selectedId,
    });
    this.props.selectOption(selectedId);
  }

  componentDidMount() {
    this.props.selectOption(this.state.selectedId);
  }

  render() {
    const {
      selectedId,
    } = this.state;
    return (
      <RadioWrapper {...this.props}>
        {
          this.props.children.map((label, id) => (
            <div key={id} onClick={() => this.selectOption(id)} className="radio-container">
              <div className={`radio ${selectedId === id? 'selected':''}`}></div>
              <div className="radio-label">{label}</div>
            </div>
          ))
        }
      </RadioWrapper>
    );
  }
}
export default RadioButtonSet;
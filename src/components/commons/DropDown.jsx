import React, { Component } from 'react'
import styled, { css } from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from 'rxjs/operators';

const Wrapper = styled.div`
  position: relative;
  width: fit-content;

  & > .label {
    background: transparent;
    border: none;
    border-bottom: 1px solid #979797;
    & > .main-label {
      background: transparent;
      border: none;
      font-weight: ${props => props.theme['$weight-bold']};
      font-size: ${props => props.theme['$font-size-xxs']};
      letter-spacing: 3px;
      text-transform: uppercase;
      outline: none;
      color: ${props => props.theme.secondaryColor};
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0px;
    }

    & > .selected-options {
      font-weight: ${props => props.theme['$weight-regular']};
      font-size: ${props => props.theme['$font-size-xxxs']};
      & > .icon {
        padding-left: 10px;
      }
    }

    & .icon {
      color: ${props => props.theme.primaryColor};
    }
  }

  & > div.body {

    width: 100%;
    z-index: 1;
    padding: 15px 10px;
    background: white;
    border: 1px solid #9d9d9d;
    font-size: 14px;
    position: absolute;

    & > input {
      width: 100%;
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
      cursor: pointer;

      & > .option {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & > .icon {
          color: ${props => props.theme.primaryColor};
        }
      }
    }
  }
`;

class DropDown extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showBody: false,
      dontClose: false,
      options: [],
      error: false,
      selectedOptions: [],
    }
    this.labelClicked = this.labelClicked.bind(this);
    this.labelBlured = this.labelBlured.bind(this);
    this.inputFocused = this.inputFocused.bind(this);
    this.inputBlurred = this.inputBlurred.bind(this);
    this.searchList = this.searchList.bind(this);
    this.optionsClicked = this.optionsClicked.bind(this);
    this.optionUnselect = this.optionUnselect.bind(this);
    this.unselectAll = this.unselectAll.bind(this);
  }

  labelClicked() {
    setTimeout(function() {
      if(this.state.dontClose){
        return;
      }
      if(this.searchSub$){
        this.searchSub$.next();
        //Reset searchSub$ whenever label is clicked.
      }
      this.setState({
        showBody: !this.state.showBody,
        searchable: null,
      });
    }.bind(this), 0);
  }

  labelBlured() {
    setTimeout(function() {
      if(this.state.showBody){
        this.labelClicked();
      }
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
      searchable: null,
    });
  }

  selectedOptionIndex(option) {
    return this.state.selectedOptions.findIndex((selectedOption) => selectedOption.id === option.id);
  }

  optionsClicked(option) {
    const {
      multiSelect,
      onOptionSelect,
    } = this.props;
    const {
      selectedOptions,
    } = this.state;

    this.setState({
      showBody: true,
      dontClose: true,
      selectedOptions: (
        () => {
          if(!multiSelect) {
            return [option];
          }
          if(this.selectedOptionIndex(option) === -1){
            return selectedOptions.concat(option);
          }
          return [...selectedOptions];
        }
      ).bind(this)(),
    });

    if(onOptionSelect) {
      onOptionSelect(option);
    }

    setTimeout(function() {
      this.setState({
        showBody: false,
        dontClose: false,
      });
    }.bind(this), 100);
  }

  optionUnselect(option) {
    const {
      onOptionClose,
      multiSelect,
    } = this.props;
    const {
      selectedOptions,
    } = this.state;

    this.setState({
      showBody: true,
      dontClose: true,
      selectedOptions: (
        () => {
          if(!multiSelect) {
            return [];
          }
          const selectedId = this.selectedOptionIndex(option);
          if(selectedId > -1){
            selectedOptions.splice(selectedId, 1);
            //Above exp returns deleted option, so relying on return statement to pass immutable data
          }
          return [...selectedOptions];
        }
      ).bind(this)(),
    });

    if(onOptionClose) {
      onOptionClose(option);
    }

    setTimeout(function() {
      this.setState({
        showBody: false,
        dontClose: false,
      });
    }.bind(this), 100);
  }

  searchList({
    target: {
      value,
    }
  }) {
    this.setState({
      searchable: value,
    });
    this.searchSub$.next(value);
  }

  componentDidUpdate(prevProps) {
    if(this.props.loadData != prevProps.loadData) {
      //This makes sure whenever `loadData` changes we reset entire state.
      this.setState({
        options: this.props.loadData,
        showBody: false,
        dontClose: false,
        error: false,
        selectedOptions: [],
      })
    }
  }

  componentDidMount() {
    const {
      loadData,
      searchData,
    } = this.props;

    if(searchData) {
      this.searchSub$ = new Subject();
      this.searchSub$.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(searchData),
        ).subscribe((options) => {
          this.setState({ options })
        });
    }

    if(loadData && typeof(loadData) == "object") {
      this.setState({
        options: loadData,
      })
    }
  }

  componentWillUnmount() {
    if(this.searchSub$) {
      this.searchSub$.complete();
    }
  }

  filterOptions() {
    const {
      options,
      searchable,
    } = this.state;

    return options
      .filter((option) => {
        if(!searchable) {
          return option;
        }
        return option.name.toLocaleLowerCase().startsWith(searchable.toLocaleLowerCase());
      })
      .slice(0, 10);
  }

  getLabel() {
    const {
      label,
      showSelectedOption,
      defaultOption,
      multiSelect,
    } = this.props;
    const {
      selectedOptions,
    } = this.state;

    if(!showSelectedOption) {
      return label
    }

    if(showSelectedOption && !multiSelect) {
      if(selectedOptions && selectedOptions.length > 0) {
        return selectedOptions[0].name
      } else if(defaultOption) {
        return defaultOption.name
      } else {
        return label
      }
    }
  }

  unselectAll(e) {
    e.stopPropagation();
    const {
      onUnselectAll,
    } = this.props;
    if(onUnselectAll) {
      onUnselectAll();
    }
    this.setState({
      selectedOptions: [],
    })
  }

  render() {
    const {
      showBody,
      error,
      selectedOptions,
      options,
    } = this.state;
    
    const {
      enableSearch,
      label,
      showSelectedOption,
      loadData,
      defaultOption,
      searchData,
    } = this.props;
    
    let visibleOptions = [];
    if(enableSearch && !searchData) {
      //SearchData is not available, no ajax data to be recieved.
      visibleOptions = this.filterOptions();
    } else {
      // SearchData is available, ajax data will be recieved.
      // If enableSearch is not true, show all.
      visibleOptions = options;
    }

    return (
      <Wrapper {...this.props}>
        <button className="label" onMouseDown={this.labelClicked} onBlur={this.labelBlured}>
          <div className="main-label">
            <div>
            {
              this.getLabel()
            }
            </div>
            {
              showBody?
                <FontAwesome className="icon" name='chevron-up' />
                :
                <FontAwesome className="icon" name='chevron-down' />
            }
          </div>
          {
            (
              selectedOptions && selectedOptions.length > 0
            ) &&
            <div className="selected-options">
              {
                selectedOptions && selectedOptions.map && selectedOptions.map((option) => option.name).join(', ')
              }
              <FontAwesome onMouseDown={this.unselectAll} className="icon" name='close' />
            </div>
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
              <input
                type="text" placeholder="Search"
                onChange={this.searchList}
                onFocus={this.inputFocused}
                onBlur={this.inputBlurred}/>
            }
            <div className="options">
              {
                visibleOptions.length === 0 && 
                  <div>No match found</div>
              }
              {
                visibleOptions.length > 0 && 
                visibleOptions
                  .map(
                    (option) => (
                      <div key={option.id} className="option">
                        <div onMouseDown={() => this.optionsClicked(option)}>{option.name}</div>
                        {
                          this.selectedOptionIndex(option) > -1 &&
                            <FontAwesome className="icon" name='times' onMouseDown={() => this.optionUnselect(option)} />
                        }
                      </div>
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
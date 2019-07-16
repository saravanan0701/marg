import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class CollapseContainer extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <div onClick={this.toggle}>
          {this.props.trigger()}
        </div>
        <Collapse isOpen={this.state.collapse}>
            <div className="pl-4">
              {this.props.body()}
            </div>
        </Collapse>
      </div>
    );
  }
}

export default CollapseContainer;
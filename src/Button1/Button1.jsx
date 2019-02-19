import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";

class Button1 extends Component {
  constructor(){
    super();
    this.state = {counter: 0};
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() { 
    this.setState({counter:this.state.counter+1}); 
  }

  render() {
    return (
      <Button intent="success" text={ this.state.counter } onClick={this.incrementCounter} />
    )}
}

export default Button1;
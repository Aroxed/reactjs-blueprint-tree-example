import React, { Component } from "react";
import "./App.css";
import Button1 from "./Button1";
 
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import {TreeExample} from './Button1/treeExample';

class App extends Component {
  
  render() {
    return (
      <div>
        <Button1 />
        <TreeExample/>

      </div>
    );
  }
}

export default App;

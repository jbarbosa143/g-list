import React, { Component } from 'react'
import Grocery from "./components/Grocery.js"


export class App extends Component {
  render() {
    return (
    <div>
      <h1>The Grocery List</h1>
      <div>
        <Grocery />
      </div>
    </div>
      
    )
  }
}

export default App;

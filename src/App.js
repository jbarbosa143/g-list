import React, { Component } from "react";
import AddItem from "./AddItem.js";
import GroceryList from "./GroceryList.js";

export class App extends Component {
  render() {
    return (
      <div className="body">
        <div className="top">
          <h1>Grocery List</h1>
        </div>
        <div className="body">
          <div className="addToList">
            <AddItem />
          </div>
          <div className="itemList">
            <GroceryList/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

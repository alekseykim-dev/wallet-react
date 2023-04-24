// @ts-nocheck
import React, {useState, Component} from "react";


class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {  // alt useState
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeColor = () => {
    this.setState({ color: "blue", brand: "Audi", model: "A8" });
  };

    
    // LIFECYCLE alt useEffect
  componentDidMount() {
    console.log("ran componentDidMount");
    // runs after first render = RETRIEVE DATA FROM BACKEND
  }

  componentWillUnmount() {
    console.log("ran componentWillUnmount");

    // runs to remove component from screen(clean eventListeners and other resources)
  }

    componentDidUpdate(prevProps, prevState) {
    console.log("ran componentDidUpdate");
    // runs when new information is entered (new props or new state)
      
    }




  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color} - {this.state.model} from {this.state.year}
          .
        </p>
        <button type="button" onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}

export default Car;
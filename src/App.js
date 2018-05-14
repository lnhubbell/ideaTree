import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import About from './components/about/about';

class App extends Component {
  state = {
    age: 27,
  }

  inputHandler = (event) => {
    console.log("Here! ", event);
    this.setState({age: event.target.value});

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <About
          nathan="Nathan"
          nathanAge={this.state.age}
          inputHandler={this.inputHandler}>hello</About>
      </div>
    );
  }
}

export default App;

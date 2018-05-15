import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Layout from './containers/Layout/Layout';
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
        <BrowserRouter>
            <div className="App">
                <Layout />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

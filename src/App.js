import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import Layout from './containers/Layout/Layout';
import { firebase } from './firebase';
import withAuthentication from './hoc/withAuthentication';

const App = () =>(
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
);



export default withAuthentication(App);

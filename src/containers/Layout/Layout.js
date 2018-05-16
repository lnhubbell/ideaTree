import React, {Component} from 'react';

import {Route, NavLink, Switch} from 'react-router-dom';

import Ideas from '../Ideas/Ideas';
import About from '../../components/About/About';
import Home from '../../components/Home/Home';
import * as routes from '../../constants/routes';

import './Layout.css';

// TODO: turn back to funcitonal
class Layout extends Component {
    render() {
        return (
            <div>
              <nav className="NavBar">
                <NavLink exact className="NavElem" to={routes.LANDING}>Home</NavLink>
                <NavLink className="NavElem" to={routes.IDEAS}>Ideas</NavLink>
                <NavLink className="NavElem" to={routes.ABOUT}>About</NavLink>
              </nav>
              <main>
                <Switch>
                  <Route exact path={routes.IDEAS} exact component={Ideas}/>
                  <Route exact path={routes.ABOUT} exact component={About}/>
                  <Route exact path={routes.LANDING} exact component={Home}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

export default Layout;

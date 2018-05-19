import React, {Component} from 'react';

import {Route, NavLink, Switch} from 'react-router-dom';

import Ideas from '../Ideas/Ideas';
import About from '../../components/About/About';
import Home from '../../components/Home/Home';
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';
import SignOutButton from '../../components/SignOut/SignOut';
import * as routes from '../../constants/routes';
import AuthUserContext from '../../components/AuthUserContext';
import './Layout.css';

// TODO: turn back to funcitonal
class Layout extends Component {
    render() {
      return (
        <div>
          <nav className="NavBar">
            <NavLink exact className="NavElem" to={routes.LANDING}>Home</NavLink>
            <NavLink className="NavElem" to={routes.ABOUT}>About</NavLink>
            <AuthUserContext>
              {
                (authUser) => authUser ?
                  <React.Fragment>
                    <NavLink className="NavElem" to={routes.IDEAS}>Ideas</NavLink>
                    <NavLink className="NavElem" to={routes.LANDING}><SignOutButton /></NavLink>
                  </React.Fragment>
                :
                <React.Fragment>
                  <NavLink className="NavElem" to={routes.SIGN_IN}>Sign In</NavLink>
                  <NavLink className="NavElem" to={routes.SIGN_UP}>Sign Up</NavLink>
                </React.Fragment>
              }
            </AuthUserContext>
          </nav>
          <main>
            <Switch>
              <Route exact path={routes.IDEAS} exact component={Ideas}/>
              <Route exact path={routes.ABOUT} exact component={About}/>
              <Route exact path={routes.LANDING} exact component={Home}/>
              <Route exact path={routes.SIGN_UP} exact component={SignUp}/>
              <Route exact path={routes.SIGN_IN} exact component={SignIn}/>

            </Switch>
          </main>
        </div>
        )
    }
}

export default Layout;

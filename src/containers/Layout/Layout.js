import React, {Component} from 'react';

import {Route, NavLink, Switch} from 'react-router-dom';

import Ideas from '../Ideas/Ideas';
import About from '../../components/About/About';
import Idea from '../../containers/Idea/Idea';
import Home from '../../components/Home/Home';
import Account from '../../components/Account/Account';
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';
import SignOutButton from '../../components/SignOut/SignOut';
import PasswordForget from '../../components/PasswordForget/PasswordForget';
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
                    <div className="NavElem"><SignOutButton /></div>
                    <NavLink className="NavElem" to={routes.ACCOUNT}>Account</NavLink>
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
              <Route path={routes.IDEAS + '/new/:parentId'} exact component={Idea}/>
              <Route path={routes.IDEAS + '/new'} exact component={Idea}/>
              <Route path={routes.IDEAS + '/:id'} component={Idea}/>
              <Route path={routes.IDEAS} component={Ideas}/>
              <Route path={routes.ABOUT} exact component={About}/>
              <Route path={routes.LANDING} exact component={Home}/>
              <Route path={routes.SIGN_UP} exact component={SignUp}/>
              <Route path={routes.SIGN_IN} exact component={SignIn}/>
              <Route path={routes.ACCOUNT} exact component={Account}/>
              <Route path={routes.PASSWORD_FORGET} exact component={PasswordForget}/>

            </Switch>
          </main>
        </div>
        )
    }
}

export default Layout;

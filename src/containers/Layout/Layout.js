import React, {Component} from 'react';

import {Route, NavLink, Switch} from 'react-router-dom';

import Ideas from '../Ideas/Ideas';
import About from '../../components/About/About';
import Idea from '../../containers/Idea/Idea';
import Home from '../../components/Home/Home';


import {account, SignUp, SignIn, SignOutButton, passwordForget} from '../../components/User';

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
              {/* these keys are necessary to that react knows to remount the DOM
                when switching between different ideas. there may be a more
                efficient way to handle this problem that removes the need to
              remount */}
              <Route path={routes.IDEAS + '/new/:parentId'} exact render={(info) => <Idea key={'child-'+info.match.params.parentId} type="new-child"/>}/>
              <Route path={routes.IDEAS + '/new'} exact render={() => <Idea key="new-parent" type="new-parent"/>}/>
              <Route path={routes.IDEAS + '/:id'} render={(info) => <Idea key={info.match.params.id} type="old"/>}/>
              <Route path={routes.IDEAS} component={Ideas}/>
              <Route path={routes.ABOUT} exact component={About}/>
              <Route path={routes.LANDING} exact component={Home}/>
              <Route path={routes.SIGN_UP} exact component={SignUp}/>
              <Route path={routes.SIGN_IN} exact component={SignIn}/>
              <Route path={routes.ACCOUNT} exact component={account.Account}/>
              <Route path={routes.PASSWORD_FORGET} exact component={passwordForget.PasswordForget}/>

            </Switch>
          </main>
        </div>
        )
    }
}

export default Layout;

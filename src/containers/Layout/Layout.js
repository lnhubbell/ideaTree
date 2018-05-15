import React, {Component} from 'react';

import {Route, NavLink, Switch} from 'react-router-dom';

import Ideas from '../Ideas/Ideas';
import About from '../../components/About/About';
import Home from '../../components/Home/Home';

import './Layout.css';

class Layout extends Component {
    URL = {
        ideas: "/ideas",
        themes: "/themes",
        about: "/about",
        home: "/",
    }


    render() {
        return (
            <div>
                <nav className="NavBar">
                    <NavLink exact className="NavElem" to={this.URL.home}>Home</NavLink>
                    <NavLink className="NavElem" to={this.URL.ideas}>Ideas</NavLink>
                    {/* <NavLink className="NavElem" to={this.URL.themes}>Themes</NavLink> */}
                    <NavLink className="NavElem" to={this.URL.about}>About</NavLink>
                </nav>
                <main>
                    <Switch>
                        <Route exact path={this.URL.ideas} exact component={Ideas}/>
                        {/* <Route exact path={this.URL.themes} exact component={Themes}/> */}
                        <Route exact path={this.URL.about} exact component={About}/>
                        <Route exact path={this.URL.home} exact component={Home}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

export default Layout;

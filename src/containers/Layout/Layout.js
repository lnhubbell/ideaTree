import React, {Component} from 'react';

import {Route, NavLink, Switch} from 'react-router-dom';

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
                <nav>
                    <NavLink to={URL.home}>Home</NavLink>
                    <NavLink to={URL.ideas}>Ideas</NavLink>
                    <NavLink to={URL.themes}>Themes</NavLink>
                    <NavLink to={URL.about}>About</NavLink>
                </nav>
                <main>
                    <Switch>
                        <Route path={URL.ideas} exact component={Ideas}/>
                        <Route path={URL.themes} exact component={Themes}/>
                        <Route path={URL.about} exact component={About}/>
                        <Route path={URL.home} exact component={Home}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

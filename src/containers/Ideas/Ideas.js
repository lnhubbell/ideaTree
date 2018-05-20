import React, {Component} from 'react';

import IdeaList from '../../components/IdeaList/IdeaList';
import {Route, NavLink, Switch} from 'react-router-dom';
import * as routes from '../../constants/routes';
import withAuthorization from '../../hoc/withAuthorization';
import axios from 'axios';

class Ideas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: {},
      themes: [
      {name: "medical", title: "Medical"},
      {name: "app", title: "App"},
      {name: "writing", title: "Writing"},
      {name: "crafts", title: "Crafts"},
      ]
    };
    this.updateThemes();
  }

  updateThemes = () => {

  }

  componentDidMount = () => {
    const uid = this.props.authUser.uid;
    axios.get(`https://idea-tree.firebaseio.com/ideas.json?orderBy="user_id"&equalTo="${uid}"`)
    .then((response) => {
      this.setState({ideas: response.data});
    }).catch(error => {
      console.log(error);
      console.error('There has been an error, good luck!');
    });
  }

  descriptionHandler = (evt, id) => {
    let newIdeas = {...this.state.ideas};
    let newIdea = {...newIdeas[id]};
    newIdea.description = evt.target.value;
    newIdeas[id] = newIdea;
    this.setState({ideas: newIdeas});
  }

  titleHandler = (evt, id) => {
    let newIdeas = {...this.state.ideas};
    let newIdea = {...newIdeas[id]};
    newIdea.title = evt.target.value;
    newIdeas[id] = newIdea;
    this.setState({ideas: newIdeas});
  }

  qualityHandler = (evt, id) => {
    let newIdeas = {...this.state.ideas};
    let newIdea = {...newIdeas[id]};
    newIdea.quality = evt.target.value;
    newIdeas[id] = newIdea;
    this.setState({ideas: newIdeas});
  }

  newIdea  = (authUser) => {
    console.log(authUser);
    const idea = {
      title: "",
      description: "",
      quality: 1,
      themes: [],
      user_id: authUser.uid,
    };
    let newIdeas = {...this.state.ideas};
    newIdeas["temp-fake-hash"] = idea;
    this.setState({ideas: newIdeas});
  }


  render() {
    return (
      <div>


        <IdeaList

            ideas={this.state.ideas}
            newIdea={this.newIdea}
          />



      </div>
        )
  }
}

const authCondition = (authUser) => Boolean(authUser);

export default withAuthorization(authCondition)(Ideas);

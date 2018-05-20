import  React, { Component } from 'react';
import './Idea.css';
import axios from 'axios';
import withAuthorization from '../../hoc/withAuthorization';
import { NavLink } from 'react-router-dom';
import * as routes from '../../constants/routes';

// TODO: break this file into multiple files, it's getting too big there are three
// unique cases that use it:
// 1. edit existing idea
// 2. create new parent idea
// 3. create new child idea

const NEW_IDEA = {
  title: "",
  description: "",
  quality: 1,
  parent_id: null
};


class Idea extends Component {
  state = {
    idea: {
      ...NEW_IDEA,
      user_id: this.props.authUser.uid,
    },

    unsaved: false
  }
  byPropKey = (propertyName, value) => () => ({
    idea: {
      ...this.state.idea,
      [propertyName]: value,
    }
  });
  componentDidMount = () => {
    console.log('remounting!!!');
    const uid = this.props.authUser.uid;
    const id = this.props.match.params.id;
    if (!id) {
      return;
    }
    this.setState({id: id});

    axios.get(`https://idea-tree.firebaseio.com/ideas/${id}.json`)
    .then((response) => {
      this.setState({idea: response.data});
    }).catch(error => {
      console.log(error);
      console.error('There has been an error, good luck!');
    });
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log('about to updtae');
    console.log(this.state);
    console.log(nextState);

    if (nextProps.match.params.parentId && (nextProps.match.params.parentId != this.state.idea.parent_id)) {
      this.setState({
        idea: {
          ...NEW_IDEA,
          user_id: this.props.authUser.uid,
          parent_id: nextProps.match.params.parentId
        },

        id: null
      })
    }

    return true;
  }

  saveIdea = () => {
    axios.put(`https://idea-tree.firebaseio.com/ideas/${this.state.id}.json`, this.state.idea)
    .then((response) => {
      // TODO handle response
    }).catch(error => {
      console.error('There has been a posting error, good luck!');
      console.error(error);
    });
  }

  createIdea = (idea) => {
    console.log(idea);
    axios.post('https://idea-tree.firebaseio.com/ideas.json', this.state.idea)
    .then((response) => {
      console.log('created');
      console.log(response);
      this.setState({id:response.data.name})
    }).catch(error => {
      console.error('There has been a posting error, good luck!');
      console.error(error);
    });
  }

  render() {
    return (
      <div className="Idea">
        <h1>Idea</h1>
        <form>
          <span>
            Title:
            <input
              value={this.state.idea.title}
              onChange={(evt) => (this.setState(this.byPropKey('title', evt.target.value)))}
            />
          </span>
          <textarea
            value={this.state.idea.description}
            rows="4"
            cols="50"
            onChange={(evt) => (this.setState(this.byPropKey('description', evt.target.value)))}
          ></textarea>
          <span>
            Quality:
            <input
              value={this.state.idea.quality}
              type="number"
              min="1"
              max="10"
              onChange={(evt) => (this.setState(this.byPropKey('quality', evt.target.value)))}
            />
          </span>
          <div className="ButtonWrapper">
            {
              !this.state.id
                ?
                  <button type="button" onClick={this.createIdea}>Create</button>
                :
                <React.Fragment>
                  <button type="button" onClick={this.saveIdea}>Save</button>
                  <button>Delete</button>
                  <NavLink to={routes.IDEAS+'/new/'+this.state.id}>
                    New Child Idea
                  </NavLink>
                </React.Fragment>
            }
          </div>
        </form>
      </div>
    )
  }
}
const authCondition = (authUser) => Boolean(authUser);

export default withAuthorization(authCondition)(Idea);

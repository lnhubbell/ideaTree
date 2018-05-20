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
    unsaved: false,
    id: null,
    childrenIdeas: []
  }
  ideaPropChange = (propertyName, value) => () => (
    this.setState({
      idea: {
        ...this.state.idea,
        [propertyName]: value,
      }
    })
  );

  loadExistingIdea = (id) => {
    axios.get(`https://idea-tree.firebaseio.com/ideas/${id}.json`)
    .then((response) => {
      this.setState({idea: response.data});
    }).catch(error => {
      console.log(error);
      console.error('There has been an error, good luck!');
    });
  }

  loadNewChild = () => {
    this.setState({
      idea: {
        ...this.state.idea,
        parent_id: this.props.match.params.parentId
      }
    })
  }


  componentDidMount = () => {
    console.log('remounting!!!');
    console.log(this.props);

    if (this.props.type === "new-child") {
      this.loadNewChild();
    } else if (this.props.type === "new-parent") {
      return;
    } else if (this.props.type === "old") {
      const id = this.props.match.params.id;
      this.setState({id: id});
      this.loadExistingIdea(id);
      this.fetchChildrenIdeasByUser(id, this.props.authUser.uid);
    }
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
      this.props.history.push(routes.IDEAS + '/' + response.data.name);
    }).catch(error => {
      console.error('There has been a posting error, good luck!');
      console.error(error);
    });
  }


  fetchChildrenIdeasByUser = (id, uid) => {
    axios.get(`https://idea-tree.firebaseio.com/ideas.json?orderBy="user_id"&equalTo="${uid}"`)
    .then((response) => {
      let childrenIdeas = [];
      for (let pair of Object.entries(response.data)) {
        const childId = pair[0];
        const childIdea = pair[1];
        childIdea['id'] = childId;
        if (childIdea.parent_id === id) {
          childrenIdeas.push(childIdea);
        }
      }
      this.setState({ childrenIdeas });
    }).catch(error => {
      console.log(error);
      console.error('There has been an error, good luck!');
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
              onChange={(evt) => this.ideaPropChange('title', evt.target.value)()}
            />
          </span>
          <textarea
            value={this.state.idea.description}
            rows="4"
            cols="50"
            onChange={(evt) => this.ideaPropChange('description', evt.target.value)()}
          ></textarea>
          <span>
            Quality:
            <input
              value={this.state.idea.quality}
              type="number"
              min="1"
              max="10"
              onChange={(evt) => this.ideaPropChange('quality', evt.target.value)()}
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
        <div>
          {
            this.state.childrenIdeas.map(idea => (
              <NavLink to={routes.IDEAS + '/' + idea.id} key={idea.id}><div>{idea.title}</div></NavLink>
            ))
          }
        </div>
      </div>
    )
  }
}
const authCondition = (authUser) => Boolean(authUser);

export default withAuthorization(authCondition)(Idea);

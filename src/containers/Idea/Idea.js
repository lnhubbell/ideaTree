import  React, { Component } from 'react';
import './Idea.css';
import axios from 'axios';
import withAuthorization from '../../hoc/withAuthorization';



const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});



class Idea extends Component {
  state = {
    title: "",
    description: "",
    quality: 1,
  }

  componentDidMount = () => {
    const uid = this.props.authUser.uid;
    const id = this.props.match.params.id;
    axios.get(`https://idea-tree.firebaseio.com/ideas/${id}.json`)
    .then((response) => {
      this.setState({...response.data, id: id});
    }).catch(error => {
      console.log(error);
      console.error('There has been an error, good luck!');
    });
  }

  saveIdea = () => {
    axios.put(`https://idea-tree.firebaseio.com/ideas/${this.state.id}.json`, this.state)
    .then((response) => {
      // TODO handle response
    }).catch(error => {
      console.error('There has been a posting error, good luck!');
    });
  }



  render() {
    console.log(this.props);
    return (
      <div className="Idea">
        <h1>Idea</h1>
        <form>
          <span>
            Title:
            <input
              value={this.state.title}
              onChange={(evt) => (this.setState(byPropKey('title', evt.target.value)))}
            />
          </span>
          <textarea
            value={this.state.description}
            rows="4"
            cols="50"
            onChange={(evt) => (this.setState(byPropKey('description', evt.target.value)))}
          ></textarea>
          <span>
            Quality:
            <input
              value={this.state.quality}
              type="number"
              min="1"
              max="10"
              onChange={(evt) => (this.setState(byPropKey('quality', evt.target.value)))}
            />
          </span>
          <div className="ButtonWrapper">
            <button type="button" onClick={this.saveIdea}>Save</button>
            <button>Delete</button>
          </div>
        </form>
      </div>
    )
  }
}
const authCondition = (authUser) => Boolean(authUser);

export default withAuthorization(authCondition)(Idea);

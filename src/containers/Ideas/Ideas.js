import React, {Component} from 'react';
import Idea from '../../components/Idea/Idea';
import AuthUserContext from '../../components/AuthUserContext'
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

  postNewIdea = (idea) => {
    console.log(idea);
    axios.post('https://idea-tree.firebaseio.com/ideas.json', idea)
        .then((response) => {
          // TODO handle response
        }).catch(error => {
            console.error('There has been a posting error, good luck!');
        });
  }

  render() {
    return (
      <div>
        <h1>Ideas</h1>
        {
          Object.entries(this.state.ideas).map((ideaPair) => {
            return <Idea
              idea={ideaPair[1]}
              themes={this.state.themes}
              key={ideaPair[0]}
              id={ideaPair[0]}
              descriptionHandler={this.descriptionHandler}
              titleHandler={this.titleHandler}
              qualityHandler={this.qualityHandler}
              postNewIdea={() => this.postNewIdea(ideaPair[1])}
                   />
          })
        }
        <div>
          <AuthUserContext>
            {authUser => <button onClick={() => this.newIdea(authUser)}>New Idea</button>}
          </AuthUserContext>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => Boolean(authUser);

export default withAuthorization(authCondition)(Ideas);

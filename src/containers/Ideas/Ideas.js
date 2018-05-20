import React, {Component} from 'react';

import IdeaList from '../../components/IdeaList/IdeaList';
import withAuthorization from '../../hoc/withAuthorization';
import axios from 'axios';

class Ideas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
    };
  }

  fetchIdeasByUser = (uid) => {
    axios.get(`https://idea-tree.firebaseio.com/ideas.json?orderBy="user_id"&equalTo="${uid}"`)
    .then((response) => {

      let ideas = [];
      for (let pair of Object.entries(response.data)) {
        const id = pair[0];
        const idea = pair[1];
        idea['id'] = id;
        if (!idea.parent_id) {
          ideas.push(idea);
        }
      }
      this.setState({ ideas });
    }).catch(error => {
      console.log(error);
      console.error('There has been an error, good luck!');
    });
  }

  componentDidMount = () => {
    const uid = this.props.authUser.uid;
    this.fetchIdeasByUser(uid);
  }

  render() {
    return <div>
      <IdeaList ideas={this.state.ideas}/>
    </div>
  }
}

const authCondition = (authUser) => Boolean(authUser);

export default withAuthorization(authCondition)(Ideas);

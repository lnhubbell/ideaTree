import React from 'react';
import './IdeaList.css';
import IdeaCard from '../IdeaCard/IdeaCard';
import { NavLink } from 'react-router-dom';
import * as routes from '../../constants/routes';

const IdeaList = (props) => {
  return (
    <div>
      <h1>Ideas</h1>
      <div style={{display: 'inline-flex', flexDirection: 'column'}}>
        {
          props.ideas.map(idea =>
            <IdeaCard
              idea={idea}
              key={idea.id}
              id={idea.id}
            />
          )
        }
      </div>
      <div>
        <NavLink to={routes.IDEAS+'/new'}>New Idea</NavLink>
      </div>
    </div>
)
}

export default IdeaList;

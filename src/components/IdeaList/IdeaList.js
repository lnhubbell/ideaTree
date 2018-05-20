import React from 'react';
import './IdeaList.css';
import IdeaCard from '../IdeaCard/IdeaCard';
import AuthUserContext from '../AuthUserContext';

const IdeaList = (props) => {
  return (
    <div>
      <h1>Ideas</h1>
      <div style={{display: 'inline-flex', flexDirection: 'column'}}>
        {
          Object.entries(props.ideas).map((ideaPair) => {
            return <IdeaCard
              idea={ideaPair[1]}
              key={ideaPair[0]}
              id={ideaPair[0]}
                   />
          })
        }
      </div>
      <div>
        <AuthUserContext>
          {authUser => <button onClick={() => props.newIdea(authUser)}>New Idea</button>}
        </AuthUserContext>
      </div>
    </div>
)
}

export default IdeaList;
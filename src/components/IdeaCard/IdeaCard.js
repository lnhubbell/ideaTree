import React from 'react';
import './IdeaCard.css';
import * as routes from '../../constants/routes';
import { NavLink } from 'react-router-dom';


const IdeaCard = (props) => {
  return (
    <div className="IdeaCard">
      <h3>{props.idea.title}</h3>
      <p>{props.idea.description}</p>

      <NavLink to={routes.IDEAS + '/' + props.id} >Edit</NavLink>
    </div>
)
}

export default IdeaCard;

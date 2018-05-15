import React from 'react';
import './Idea.css';

const idea = (props) => {
  return (
      <div className="Idea">
          <input value={props.idea.title}/>
          <input value={props.idea.description} type="textarea" />
          <input value={props.idea.quality} type="number" min="1" max="10"/>
          <select value={props.idea.theme} name="theme">
              {props.themes.map((theme) => {
                  <option value={theme.name}>{theme.title}</option>
              })}
          </select>
          <p>Selected Themes:</p>
          {props.idea.themes.map((theme)=> {
              <div>{theme.title}</div>
          })}
          <button>Create</button>
          <button>Save</button>
          <button>Delete</button>
      </div>
)
}

export default idea;

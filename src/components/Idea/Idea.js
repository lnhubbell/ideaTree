import React from 'react';
import './Idea.css';

const idea = (props) => {
  return (
      <div className="Idea">
        <input
          value={props.idea.title}
          onChange={(evt) => (props.titleHandler(evt, props.id))}
        />
        <textarea
          value={props.idea.description}
          rows="4"
          cols="50"
          onChange={(evt) => (props.descriptionHandler(evt, props.id))}
        ></textarea>
        <input
          value={props.idea.quality}
          type="number"
          min="1"
          max="10"
          onChange={(evt) => (props.qualityHandler(evt, props.id))}
        />

        {/* <select name="theme">
          {props.themes.map((theme) => (
            <option key={theme.name} value={theme.name}>{theme.title}</option>
          ))}
          </select>

          <p>Selected Themes:</p>
          {
          props.idea.themes.map((theme) => (
            <div key={theme.name}>{theme.title}</div>
          ))
        } */}
        <div className="ButtonWrapper">
          <button onClick={props.postNewIdea}>Save</button>
          <button>Delete</button>
        </div>
      </div>
)
}

export default idea;

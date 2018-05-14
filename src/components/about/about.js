import React from 'react';

const about = (props) => {

  const laura = (
    <h2>Laura</h2>
  )

  return (
    <div>
      <input
        type="int"
        onChange={(event) => props.inputHandler(event)}
        value={props.nathanAge}
      />
    <h1>About: {props.nathan}</h1>
    <p>{props.children}</p>
    {laura}
  </div>
)
}

export default about;

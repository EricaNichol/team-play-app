import React from 'react';

export default function ToggleTheme(props) {

  return (
    <button 
      onClick={props.onToggleTheme}
      style={{position: "absolute", left: "0", fontWeight: "bold"}}
      >
      Light
    </button>
  )
}

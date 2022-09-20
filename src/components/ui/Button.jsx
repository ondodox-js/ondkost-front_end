import React from 'react';

function Button(props) {
   return (
      <button
         className="px-2 py-1.5 border rounded hover:bg-app-500"
         {...props}
      >
         {props.children}
      </button>
   );
}

export default Button;

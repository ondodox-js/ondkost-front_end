import React from 'react';

function DefaultInput(props) {
   return (
      <div className="flex items-center">
         <label htmlFor={props.name} className="flex-1">
            {props.text}
         </label>
         <input
            type={props.type}
            id={props.name}
            className="px-2 py-1.5 rounded outline-none text-app-600 flex-1 border border-app-500"
            placeholder={props.placeholder}
            onKeyUp={props.handleOnKeyUp}
         />
      </div>
   );
}

export default DefaultInput;

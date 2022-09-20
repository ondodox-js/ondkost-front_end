import React from 'react';

function Input(props) {
   return (
      <input
         className="px-2 py-1.5 w-full rounded focus:outline-none text-app-600 border-2 border-transparent focus:border-app-300"
         {...props}
      />
   );
}

export default Input;

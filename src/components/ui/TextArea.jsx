import React from 'react';

function TextArea(props) {
   return (
      <textarea
         cols="30"
         rows="5"
         {...props}
         className="px-2 py-1.5 w-full rounded focus:outline-none text-app-600 border-2 border-transparent focus:border-app-300"
      ></textarea>
   );
}

export default TextArea;

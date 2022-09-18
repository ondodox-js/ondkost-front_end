import React from 'react';

function Title({ children }) {
   return (
      <h3 className="uppercase opacity-100 font-medium text-base">
         {children}
      </h3>
   );
}

export default Title;

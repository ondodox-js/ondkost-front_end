import React from 'react';

function SubTitle(props) {
   let align =
      'center' in props
         ? 'text-center'
         : 'end' in props
         ? 'text-end'
         : 'text-start';

   return (
      <h3 className={`uppercase opacity-50 font-medium ${align}`}>
         {props.children}
      </h3>
   );
}

export default SubTitle;

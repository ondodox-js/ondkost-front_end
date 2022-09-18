import React from 'react';
import { DoneIcon, FailIcon, LoadingIcon } from '../../assets/icons';

function DefaultAlert(props) {
   const className = 'w-8 opacity-50 m-auto';
   return (
      <div className="text-center">
         <h3>{props.children}</h3>
         {props.loading && (
            <LoadingIcon className={`${className} animate-spin`} />
         )}
         {props.success && <DoneIcon className={className} />}
         {props.failed && <FailIcon className={className} />}
      </div>
   );
}

export default DefaultAlert;

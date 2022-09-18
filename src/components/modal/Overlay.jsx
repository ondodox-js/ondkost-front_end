import React from 'react';
import { useEffect } from 'react';

function Overlay(props) {
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.body.classList.add('overflow-hidden');

      return () => {
         document.body.classList.remove('overflow-hidden');
      };
   });
   return (
      <div>
         <div
            className="absolute top-0 left-0 w-full h-screen bg-black opacity-40 m-0"
            onClick={() => props.setModal(null)}
         ></div>
         <div className="absolute bg-app-500 top-4 left-2 sm:left-[calc(50%/2)] m-auto w-full max-w-[calc(100%-1rem)] sm:max-w-[calc(50%-2rem)] rounded p-2 z-10">
            {props.children}
         </div>
      </div>
   );
}

export default Overlay;

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Title } from '../components/typographys';

function NotFound() {
   let [messageState, setMessageState] = useState(null);
   useEffect(() => {
      let currentUrl = window.location.href;
      setMessageState(currentUrl);
   }, []);

   return (
      <section className="backdrop-blur bg-app-500/50 rounded p-4" id="room">
         <div className="relative space-y-4">
            <Title>Not found!</Title>
            <div className="p-12 text-center">
               <p>not found window location:</p>
               {messageState && messageState}
            </div>
         </div>
      </section>
   );
}

export default NotFound;

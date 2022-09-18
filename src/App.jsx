import React from 'react';
import { useState } from 'react';
import Header from './components/headers/Header';
import ClientRoutes from './routes/ClientRoutes';
import OwnerRoutes from './routes/OwnerRoutes';

const user = {
   isOwner: true,
};

function App() {
   let [userState, setUserState] = useState(user);
   return (
      <div className="bg-app-600 text-app-100 min-h-screen">
         <Header user={userState} changeUser={setUserState} />
         <div className="max-w-6xl m-auto px-2">
            {userState.isOwner ? <OwnerRoutes /> : <ClientRoutes />}
         </div>
      </div>
   );
}

export default App;

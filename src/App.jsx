import React from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import Header from './components/headers/Header';
import ClientRoutes from './routes/ClientRoutes';
import OwnerRoutes from './routes/OwnerRoutes';

export let AuthContext = createContext();

function App() {
   let [loginState, setLoginState] = useState(null);
   const authContextValue = {
      loginState,
      setLoginState,
   };
   useEffect(() => {
      let login = localStorage.getItem('login');
      setLoginState(login);
   }, [loginState]);
   return (
      <AuthContext.Provider value={authContextValue}>
         <div className="bg-app-600 text-app-100 min-h-screen">
            <Header loginState={loginState} />
            <div className="max-w-6xl m-auto px-4">
               {loginState ? <OwnerRoutes /> : <ClientRoutes />}
            </div>
         </div>
      </AuthContext.Provider>
   );
}

export default App;

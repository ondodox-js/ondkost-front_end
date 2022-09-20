import React, { useState } from 'react';
import { createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Overlay } from '../../components/modal';
import { SubTitle } from '../../components/typographys';
import { navOwner } from '../../utils/constants';

export const DashboardContext = createContext();

function Dashboard(props) {
   const [modalState, setModalState] = useState(null);

   const valueDashboardContext = {
      modalState,
      setModalState,
   };

   const login = localStorage.getItem('login');
   if (!login) {
      return <Navigate to={'/login'} />;
   }

   return (
      <div className="last:space-y-4">
         <SubTitle center>{props.children}</SubTitle>
         <DashboardContext.Provider value={valueDashboardContext}>
            <Routes>
               {navOwner
                  .find(item => item.id === 1)
                  .childs.map(child => (
                     <Route
                        path={child.path}
                        element={child.element}
                        key={child.path}
                     />
                  ))}
            </Routes>
         </DashboardContext.Provider>
         {modalState && (
            <Overlay setModal={setModalState}>{modalState}</Overlay>
         )}
      </div>
   );
}

export default Dashboard;

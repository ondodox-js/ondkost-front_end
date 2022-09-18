import React, { useState } from 'react';
import { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Overlay } from '../../components/modal';
import { SubTitle } from '../../components/typographys';
import { navOwner } from '../../utils/constants';

export const MasterContext = createContext();

function Master(props) {
   const [modalState, setModalState] = useState(null);

   const valueMasterContext = {
      modalState,
      setModalState,
   };

   return (
      <div className="last:space-y-4">
         <SubTitle center>{props.children}</SubTitle>
         <MasterContext.Provider value={valueMasterContext}>
            <Routes>
               {navOwner
                  .find(item => item.id === 2)
                  .childs.map(child => (
                     <Route
                        path={child.path}
                        element={child.element}
                        key={child.path}
                     />
                  ))}
            </Routes>
         </MasterContext.Provider>
         {modalState && (
            <Overlay setModal={setModalState}>{modalState}</Overlay>
         )}
      </div>
   );
}

export default Master;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { navClient } from '../utils/constants';

function ClientRoutes() {
   return (
      <Routes>
         {navClient.map(item => (
            <Route path={item.path} element={item.component} key={item.name} />
         ))}
      </Routes>
   );
}

export default ClientRoutes;

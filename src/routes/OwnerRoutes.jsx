import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavigationOwner } from '../components/navigations';
import NotFound from '../pages/NotFound';
import { navOwner } from '../utils/constants';

function OwnerRoutes() {
   return (
      <div className="flex">
         <NavigationOwner />
         <main className="w-full pb-2 sm:pl-4">
            <Routes>
               {navOwner.map(item => (
                  <Route
                     path={item.path}
                     element={item.component}
                     key={item.name}
                  />
               ))}
               <Route path="*" element={<NotFound />} />
            </Routes>
         </main>
      </div>
   );
}

export default OwnerRoutes;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { navClient } from '../../utils/constants';

function NavigationClient() {
   return (
      <nav className="max-w-md w-full">
         <div className="flex justify-around">
            {navClient.map(item => (
               <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                     `text-app-100 opacity-50 hover:opacity-100 capitalize ${
                        isActive ? 'opacity-100' : ''
                     }`
                  }
               >
                  {item.name}
               </NavLink>
            ))}
         </div>
      </nav>
   );
}

export default NavigationClient;

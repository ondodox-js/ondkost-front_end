import React from 'react';
import { NavLink } from 'react-router-dom';
import { navOwner } from '../../utils/constants';

function NavigationOwner() {
   return (
      <aside className="min-w-max mr-8 sm:block hidden h-[calc(100vh-1rem-44px)] sticky top-[calc(1rem+44px)]">
         <nav>
            <ul className="space-y-8">
               {navOwner.map(item => (
                  <li className="space-y-4" key={item.name}>
                     <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                           `font-medium uppercase ${
                              isActive ? 'opacity-100' : 'opacity-50'
                           }`
                        }
                     >
                        {item.name}
                     </NavLink>
                     <ul className="pl-4 space-y-2">
                        {item.childs.map(child => (
                           <li key={child.path}>
                              <NavLink
                                 to={child.to}
                                 className={({ isActive }) =>
                                    `border-l pl-4 capitalize cursor-pointer ${
                                       isActive
                                          ? 'border-app-100'
                                          : 'border-transparent'
                                    }`
                                 }
                              >
                                 {child.name}
                              </NavLink>
                           </li>
                        ))}
                     </ul>
                  </li>
               ))}
            </ul>
         </nav>
      </aside>
   );
}

export default NavigationOwner;

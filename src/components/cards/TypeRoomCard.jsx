import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BedRoomIcon, MoneyIcon } from '../../assets/icons';
import { findOneTypeStock } from '../../utils/consume-api/v2';
import { SubTitle } from '../typographys';

function TypeRoomCard(props) {
   const [stockState, setStockState] = useState(null);

   useEffect(() => {
      const get = async () => {
         setStockState(await findOneTypeStock(props.id));
      };
      get();
   }, [props.id]);

   return (
      <div className="w-full sm:w-1/2 md:w-1/3 flex-none sm:pr-2 snap-start mb-2">
         <div
            className={`p-2 bg-app-600/5 rounded space-y-2 min-h-[7rem] ${
               stockState == null ? 'animate-pulse' : ''
            }`}
         >
            <SubTitle>{props.typeName}</SubTitle>
            <p className="flex items-center text-xs">
               <BedRoomIcon className="w-5 fill-app-100 mr-2" />
               {stockState == null ? 0 : stockState.amount}
               <span className="ml-1">Rooms</span>
            </p>
            <p className="flex items-center text-xs">
               <MoneyIcon className="w-5 fill-app-100 mr-2" />
               <span className="mr-1">Rp</span>
               {props.price.toLocaleString('id-ID')}
               <span className="text-xs pl-1">/ month</span>
            </p>
            <p className="flex items-center text-xs justify-end">
               <span className="mr-1">Left</span>
               {stockState == null ? 0 : stockState.left}
               <span className="ml-1">Rooms</span>
            </p>
         </div>
      </div>
   );
}

export default TypeRoomCard;

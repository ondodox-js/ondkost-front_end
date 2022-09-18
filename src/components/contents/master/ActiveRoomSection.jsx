import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { CalendarIcon, PersonIcon } from '../../../assets/icons';
import {
   findAllRenterByTypeAndActive,
   findAllType,
   findRenterDesc,
} from '../../../utils/consume-api/v2';
import { SubTitle, Title } from '../../typographys';

function ActiveRoomCard(props) {
   let [descState, setDescState] = useState(null);

   useEffect(() => {
      let mounted = async () => {
         let renterDesc = await findRenterDesc(props.id);
         const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
         };
         setDescState({
            ...renterDesc,
            end: new Date(renterDesc.end).toLocaleDateString('en-EN', options),
         });
      };
      mounted();
   }, [props]);
   return (
      <div className="w-full sm:w-1/2 md:w-1/4 flex-none sm:pr-2 mb-2 snap-start">
         <div className={`p-2 bg-app-600/5 rounded space-y-2 min-h-[7rem]`}>
            <SubTitle center>
               {props.room.roomNumber.toString().padStart(3, '0') || '-'}
            </SubTitle>
            <p className="flex items-center text-xs">
               <PersonIcon className="w-5 fill-app-100 mr-2" />
               <span className="mr-1">{props.user.name}</span>
            </p>
            <p className="flex items-center text-xs">
               <CalendarIcon className="w-5 fill-app-100 mr-2" />
               <span className="mr-1 text-green-500">
                  {descState && descState.end}
               </span>
            </p>
         </div>
      </div>
   );
}

function ActiveRoomSection(props) {
   let [typeRoomState, setTypeRoomState] = useState(null);

   useEffect(() => {
      const mounted = async () => {
         setTypeRoomState(await findAllType());
      };
      mounted();
   }, []);
   return (
      <>
         <section
            className="backdrop-blur bg-app-500/50 rounded p-4"
            id="active-room"
         >
            <div className="relative">
               <Title>{props.children}</Title>
            </div>
         </section>
         {typeRoomState &&
            typeRoomState.map(type => (
               <SectionTypeRoom {...type} key={type.id} />
            ))}
      </>
   );
}

function SectionTypeRoom(props) {
   let [renterState, setRenterState] = useState(null);

   useEffect(() => {
      let mounted = async () => {
         setRenterState(await findAllRenterByTypeAndActive(props.id));
      };
      mounted();
   }, [props]);

   return (
      <section className="backdrop-blur bg-app-500/50 rounded p-4 space-y-4">
         <Title>
            <span className="italic">{props.typeName}</span> | Rp{' '}
            {props.price.toLocaleString('id-ID')}
         </Title>
         <div className="flex flex-wrap">
            {renterState && renterState.length > 0 ? (
               renterState.map(renter => (
                  <ActiveRoomCard {...renter} key={renter.id} />
               ))
            ) : (
               <section className="w-full">
                  <SubTitle center>Room not found in this type!</SubTitle>
               </section>
            )}
         </div>
      </section>
   );
}

export default ActiveRoomSection;

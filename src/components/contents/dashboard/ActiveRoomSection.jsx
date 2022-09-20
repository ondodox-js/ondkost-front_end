import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
   CalendarIcon,
   MoneyIcon,
   OutIcon,
   PersonIcon,
} from '../../../assets/icons';
import { DashboardContext } from '../../../pages/owner/Dashboard';
import {
   createPayment,
   findAllRenterByTypeAndActive,
   findAllType,
   findRenterDesc,
   finishedRenter,
} from '../../../utils/consume-api/v2';
import { SubTitle, Title } from '../../typographys';
import { Button, Input, Label } from '../../ui';

function ExtensionForm(props) {
   const [formState, setFormState] = useState({});

   const handleOnSubmit = async e => {
      e.preventDefault();

      await createPayment(props.id, formState);

      props.setUpdateState(!props.updateState);
      props.setModal(null);
   };

   return (
      <form onSubmit={handleOnSubmit} className="space-y-2">
         <SubTitle>Boarding house extension</SubTitle>
         <div className="flex flex-wrap justify-end">
            <div className="w-full lg:w-1/2 space-y-2 p-1">
               <div>
                  <Label>Name</Label>
                  <Input
                     type="text"
                     placeholder="Standard bed"
                     readOnly
                     value={props.user.name}
                  />
               </div>
               <div>
                  <Label>Room number</Label>
                  <Input
                     type="text"
                     placeholder="250000"
                     readOnly
                     value={props.room.roomNumber.toString().padStart(3, '0')}
                  />
               </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-2 p-1">
               <div>
                  <Label>Period</Label>
                  <Input
                     type="number"
                     placeholder="12"
                     onKeyUp={e => {
                        setFormState({
                           ...formState,
                           period: e.target.value,
                        });
                     }}
                  />
               </div>
            </div>
            <div className="mt-2">
               <Button>Continue</Button>
            </div>
         </div>
      </form>
   );
}
function LeftModal(props) {
   const handleOnSubmit = async e => {
      e.preventDefault();

      await finishedRenter(props.id);

      props.setUpdateState(!props.updateState);
      props.setModal(null);
   };

   const handleClickCancel = () => {
      props.setModal(null);
   };

   return (
      <form onSubmit={handleOnSubmit} className="space-y-2">
         <SubTitle>Stop extending boarding house?</SubTitle>
         <div className="flex flex-wrap justify-end">
            <div className="w-full sm:w-1/2 space-y-2 p-1 text-center">
               <Button type="button" onClick={handleClickCancel}>
                  Cancel
               </Button>
            </div>
            <div className="w-full sm:w-1/2 space-y-2 p-1 text-center">
               <Button type="submit">Stop it.</Button>
            </div>
         </div>
      </form>
   );
}

function ActiveRoomCard(props) {
   let [descState, setDescState] = useState(null);

   const { setModalState } = useContext(DashboardContext);

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
   }, [props.id, props.updateState]);

   const handleClickExtension = () => {
      setModalState(
         <ExtensionForm
            setModal={setModalState}
            {...props}
            updateState={props.updateState}
            setUpdateState={props.setUpdateState}
         />
      );
   };

   const handleClickLeft = () => {
      setModalState(
         <LeftModal
            setModal={setModalState}
            {...props}
            updateState={props.updateState}
            setUpdateState={props.setUpdateState}
         />
      );
   };

   return (
      <div className="w-full sm:w-1/2 md:w-1/3 flex-none sm:pr-2 mb-2 snap-start">
         <div className={`p-2 bg-app-600/5 rounded space-y-2 relative`}>
            <SubTitle center>
               {props.room.roomNumber.toString().padStart(3, '0') || '-'}
            </SubTitle>
            <p className="flex items-center text-xs">
               <PersonIcon className="w-5 fill-app-100 mr-2" />
               <span className="mr-1">{props.user.name}</span>
            </p>
            <p className="flex items-center text-xs">
               <CalendarIcon className="w-5 fill-app-100 mr-2" />
               <span
                  className={
                     descState &&
                     `mr-1 ${
                        !descState.late ? 'text-green-500' : 'text-red-500'
                     }`
                  }
               >
                  {descState && descState.end}
               </span>
            </p>
            <div className="absolute right-2 top-2 flex gap-2 items-center">
               <button
                  className="group opacity-50 group-hover:opacity-100"
                  title="Boarding house extension?"
                  onClick={handleClickExtension}
               >
                  <MoneyIcon className="w-5 h-5 group-hover:fill-yellow-500" />
               </button>
               <button
                  className="group opacity-50 group-hover:opacity-100"
                  onClick={handleClickLeft}
                  title="Left from boarding house!"
               >
                  <OutIcon className="w-5 h-5 group-hover:fill-red-500" />
               </button>
            </div>
         </div>
      </div>
   );
}

function SectionTypeRoom(props) {
   let [renterState, setRenterState] = useState(null);
   let [updateState, setUpdateState] = useState(false);

   useEffect(() => {
      let mounted = async () => {
         setRenterState(await findAllRenterByTypeAndActive(props.id));
      };
      mounted();
   }, [props.id, updateState]);

   return (
      <section className="backdrop-blur bg-app-500/50 rounded p-4 space-y-4">
         <Title>
            <span className="italic">{props.typeName}</span> | Rp{' '}
            {props.price.toLocaleString('id-ID')}
         </Title>
         <div className="flex flex-wrap">
            {renterState && renterState.length > 0 ? (
               renterState
                  .sort((i, j) => i.room.roomNumber - j.room.roomNumber)
                  .map(renter => (
                     <ActiveRoomCard
                        {...renter}
                        handleClickExtension={props.handleClickExtension}
                        updateState={updateState}
                        setUpdateState={setUpdateState}
                        key={renter.id}
                     />
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

export default ActiveRoomSection;

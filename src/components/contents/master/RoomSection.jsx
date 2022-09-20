import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AddIcon } from '../../../assets/icons';
import { MasterContext } from '../../../pages/owner/Master';
import {
   createRoom,
   findAllRoomByType,
   findAllType,
} from '../../../utils/consume-api/v2';
import RoomCard from '../../cards/RoomCard';
import { SubTitle, Title } from '../../typographys';
import { Button, Input, Label, SelectOption } from '../../ui';

function InsertForm(props) {
   const [formState, setFormState] = useState({});
   const [typeRoomState, setTypeRoomState] = useState(null);

   useEffect(() => {
      const mounted = async () => {
         setTypeRoomState(await findAllType());
      };
      mounted();
   }, []);

   const handleOnSubmit = async e => {
      e.preventDefault();
      const { typeId } = formState;
      delete formState.typeId;

      await createRoom(typeId, formState);
      props.setModal(null);
      props.setUpdateState(!props.updateState);
   };

   return (
      <form onSubmit={handleOnSubmit} className="space-y-2">
         <SubTitle>Add Room</SubTitle>
         <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 space-y-2 p-1">
               <div>
                  <Label>Room type</Label>
                  <SelectOption
                     handleOnChange={e => {
                        setFormState({
                           ...formState,
                           typeId: +e.target.value,
                        });
                     }}
                     items={typeRoomState || []}
                  />
               </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-2 p-1">
               <div>
                  <Label>Room number</Label>
                  <Input
                     text="Room number"
                     type="text"
                     placeholder="10"
                     onKeyUp={e => {
                        setFormState({
                           ...formState,
                           roomNumber: +e.target.value,
                        });
                     }}
                  />
               </div>
               <div className="text-right">
                  <Button>Insert</Button>
               </div>
            </div>
         </div>
      </form>
   );
}

function CardSection(props) {
   const [roomState, setRoomState] = useState(null);

   useEffect(() => {
      const mounted = async () => {
         setRoomState(await findAllRoomByType(props.id));
      };

      mounted();
   }, [props.id, props.updateState]);

   return (
      <div className="backdrop-blur bg-app-500/50 rounded p-4">
         <SubTitle>{props.typeName}</SubTitle>
         <div className="flex flex-wrap mt-2">
            {roomState &&
               (roomState.length > 0 ? (
                  roomState
                     .sort((i, j) => i.roomNumber - j.roomNumber)
                     .map(room => (
                        <RoomCard
                           {...room}
                           typeId={props.id}
                           typeName={props.typeName}
                           key={room.id}
                           setRoomState={setRoomState}
                           roomState={roomState}
                        />
                     ))
               ) : (
                  <h3 className="w-full text-center p-2 bg-app-600/5 rounded space-y-2">
                     Empty room
                  </h3>
               ))}
         </div>
      </div>
   );
}

function RoomSection(props) {
   const [typeRoomState, setTypeRoomState] = useState(null);
   const [updateState, setUpdateState] = useState(false);

   const { setModalState } = useContext(MasterContext);

   useEffect(() => {
      const mounted = async () => {
         setTypeRoomState(await findAllType());
      };
      mounted();
   }, []);
   return (
      <>
         <section className="backdrop-blur bg-app-500/50 rounded p-4" id="room">
            <div className="relative space-y-4">
               <Title>{props.children}</Title>
               <button
                  className="absolute right-0 top-0"
                  style={{ margin: 0 }}
                  onClick={() =>
                     setModalState(
                        <InsertForm
                           setModal={setModalState}
                           setUpdateState={setUpdateState}
                           updateState={updateState}
                        />
                     )
                  }
               >
                  <AddIcon className="w-6 opacity-50  hover:opacity-100" />
               </button>
            </div>
         </section>
         {typeRoomState &&
            typeRoomState.map(type => (
               <CardSection {...type} key={type.id} updateState={updateState} />
            ))}
      </>
   );
}

export default RoomSection;

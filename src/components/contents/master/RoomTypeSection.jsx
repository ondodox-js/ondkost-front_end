import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AddIcon } from '../../../assets/icons';
import { MasterContext } from '../../../pages/owner/Master';
import { createTypeRoom, findAllType } from '../../../utils/consume-api/v2';
import { TypeRoomCard } from '../../cards';
import { SubTitle, Title } from '../../typographys';
import { Button, Input, Label, TextArea } from '../../ui';

function InsertForm(props) {
   const [formState, setFormState] = useState({});

   const handleOnSubmit = async e => {
      e.preventDefault();
      const typeRoom = await createTypeRoom(formState);
      props.setTypeRoomState([...props.typeRoomState, typeRoom]);
      props.setModal(null);
   };

   return (
      <form onSubmit={handleOnSubmit} className="space-y-2">
         <SubTitle>Add Type</SubTitle>
         <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 space-y-2 p-1">
               <div>
                  <Label>Type name</Label>
                  <Input
                     type="text"
                     placeholder="Standard bed"
                     handleOnKeyUp={e => {
                        setFormState({
                           ...formState,
                           typeName: e.target.value,
                        });
                     }}
                  />
               </div>
               <div>
                  <Label>Price name</Label>
                  <Input
                     name="price"
                     type="number"
                     placeholder="250000"
                     handleOnKeyUp={e => {
                        setFormState({ ...formState, price: e.target.value });
                     }}
                  />
               </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-2 p-1">
               <div>
                  <Label>Description</Label>
                  <TextArea
                     placeholder="Hello world!"
                     handleOnKeyUp={e => {
                        setFormState({
                           ...formState,
                           description: e.target.value,
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

function RoomTypeSection(props) {
   const [typeRoomState, setTypeRoomState] = useState(null);
   const { setModalState } = useContext(MasterContext);

   useEffect(() => {
      const mounted = async () => {
         setTypeRoomState(await findAllType());
      };
      mounted();
   }, []);
   return (
      <section
         className="backdrop-blur bg-app-500/50 rounded p-4"
         id="type-room"
      >
         <div className="relative space-y-4">
            <Title>{props.children}</Title>
            <button
               className="absolute right-0 top-0"
               style={{ margin: 0 }}
               onClick={() =>
                  setModalState(
                     <InsertForm
                        setModal={setModalState}
                        setTypeRoomState={setTypeRoomState}
                        typeRoomState={typeRoomState}
                     />
                  )
               }
            >
               <AddIcon className="w-6 opacity-50  hover:opacity-100" />
            </button>
            <div className="flex flex-wrap">
               {typeRoomState &&
                  typeRoomState.map(type => (
                     <TypeRoomCard {...type} key={type.id} />
                  ))}
            </div>
         </div>
      </section>
   );
}

export default RoomTypeSection;

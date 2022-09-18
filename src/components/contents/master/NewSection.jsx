import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { DashboardContext } from '../../../pages/owner/Dashboard';
import {
   createRenter,
   findAllRoomByTypeAndStatus,
   findAllType,
} from '../../../utils/consume-api/v2';
import { DefaultAlert } from '../../alerts';
import { Title } from '../../typographys';
import { Button, Input, Label, SelectOption } from '../../ui';

function NewSection(props) {
   const [formState, setFormState] = useState({});
   const [typeRoomState, setTypeRoomState] = useState(null);
   const [roomState, setRoomState] = useState(null);

   const { setModalState } = useContext(DashboardContext);

   useEffect(() => {
      const mounted = async () => {
         setTypeRoomState(await findAllType());
      };
      mounted();
   }, []);

   const handleOnSubmit = async e => {
      e.preventDefault();

      setModalState(<DefaultAlert loading>Loading...</DefaultAlert>);

      await new Promise(async (resolve, reject) => {
         let { roomId } = formState;
         delete formState.roomId;
         let insert = await createRenter(roomId, formState);
         if ('error' in insert) {
            setModalState(<DefaultAlert failed>Failed created!</DefaultAlert>);
            setTimeout(() => {
               setModalState(null);
               reject(insert.error);
            }, 3000);
         } else {
            setModalState(<DefaultAlert success>Created!</DefaultAlert>);
            setTimeout(() => {
               setModalState(null);
               e.target.reset();
               resolve();
            }, 3000);
         }
      });
   };

   return (
      <section
         className="backdrop-blur bg-app-500/50 rounded p-4 relative"
         id="new-section"
      >
         <div className="space-y-4">
            <Title>{props.children}</Title>
            <form onSubmit={handleOnSubmit} className="space-y-2">
               <div className="flex flex-wrap">
                  <div className="w-full lg:w-1/2 space-y-2 p-1">
                     <div>
                        <Label>Name</Label>
                        <Input
                           type="text"
                           placeholder="John Kennedy"
                           handleOnKeyUp={e => {
                              setFormState({
                                 ...formState,
                                 name: e.target.value,
                              });
                           }}
                        />
                     </div>
                     <div>
                        <Label>First rent</Label>
                        <Input
                           type="number"
                           placeholder="2 month"
                           handleOnKeyUp={e => {
                              setFormState({
                                 ...formState,
                                 period: +e.target.value,
                              });
                           }}
                        />
                     </div>
                  </div>
                  <div className="w-full lg:w-1/2 space-y-2 p-1">
                     <div>
                        <Label>Room type</Label>
                        <SelectOption
                           handleOnChange={async e => {
                              setRoomState(
                                 await findAllRoomByTypeAndStatus(
                                    +e.target.value,
                                    false
                                 )
                              );
                           }}
                           items={typeRoomState || []}
                        />
                     </div>
                     <div>
                        <Label>Room</Label>
                        <SelectOption
                           handleOnChange={e => {
                              setFormState({
                                 ...formState,
                                 roomId: +e.target.value,
                              });
                           }}
                           items={roomState || []}
                        />
                     </div>

                     <div className="text-right">
                        <Button>Insert</Button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </section>
   );
}

export default NewSection;

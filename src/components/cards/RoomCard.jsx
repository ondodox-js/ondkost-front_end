import React from 'react';
import { TrashIcon } from '../../assets/icons';
import { deleteRoom } from '../../utils/consume-api/v2';

function RoomCard(props) {
   let handleClickTrash = async () => {
      let number = props.roomNumber.toString().padStart(2, '0');
      if (
         window.confirm(`Are u sure to delete ${number} in ${props.typeName}`)
      ) {
         await deleteRoom(props.typeId, props.id);
         props.setRoomState(
            props.roomState.filter(room => room.id !== props.id)
         );
         alert('Successfully deleted!');
      }
   };

   return (
      <div className="w-full sm:w-1/2 md:w-1/4 flex-none sm:pr-2 mb-2 snap-start">
         <div className={`p-2 bg-app-600/5 rounded space-y-2 text-center `}>
            <h3 className="uppercase opacity-50 font-medium text-xl">
               {props.roomNumber.toString().padStart(3, '0')}
            </h3>
            <p className={`relative text-xs`}>
               <span className={`mr-1 ${props.status ? ' opacity-50' : ''}`}>
                  {!props.status ? 'available' : 'not available'}
               </span>
               <button
                  className="absolute right-0 top-0 group opacity-50 group-hover:opacity-100"
                  onClick={handleClickTrash}
               >
                  <TrashIcon className="w-4 h-4 group-hover:fill-red-500" />
               </button>
            </p>
         </div>
      </div>
   );
}

export default RoomCard;

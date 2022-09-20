import { getOption, postOption, deleteOption } from '../authorization';

const base = 'http://localhost:8083/v2';

//type-room
export const findOneTypeStock = async typeId => {
   return await fetch(`${base}/type-room/${typeId}/room-stock`, getOption())
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const findAllType = async () => {
   return await fetch(`${base}/type-room`, getOption())
      .then(resp => {
         return resp.ok ? resp.json() : null;
      })
      .catch(err => console.log(err));
};

export const createTypeRoom = async body => {
   return await fetch(`${base}/type-room`, postOption(body))
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

//room
export const createRoom = async (typeId, body) => {
   return await fetch(`${base}/type-room/${typeId}/room`, postOption(body))
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const deleteRoom = async (typeId, roomId) => {
   return await fetch(
      `${base}/type-room/${typeId}/room/${roomId}`,
      deleteOption()
   )
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const findAllRoomByType = async typeId => {
   return await fetch(`${base}/type-room/${typeId}/room`, getOption())
      .then(resp => resp.json())
      .then(result => result || [])
      .catch(err => console.log(err));
};

export const findAllRoomByTypeAndStatus = async (typeId, status) => {
   return await fetch(
      `${base}/type-room/${typeId}/room-status/${status}`,
      getOption()
   )
      .then(resp => resp.json())
      .then(result => result || [])
      .catch(err => console.log(err));
};

//renter
export const createRenter = async (roomId, body) => {
   return await fetch(`${base}/room/${roomId}/renter`, postOption(body))
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const findAllRenterByTypeAndActive = async typeId => {
   return await fetch(`${base}/type-room/${typeId}/renter`, getOption())
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const findRenterDesc = async renterId => {
   return await fetch(`${base}/renter/${renterId}/desc`, getOption())
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => {
         console.log(err, 'error, get renter desc');
         return {};
      });
};

export const finishedRenter = async renterId => {
   return await fetch(`${base}/renter/${renterId}/finished`, deleteOption())
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => {
         console.log(err, 'error, call request renter finished');
         return {};
      });
};

//payment
export const createPayment = async (renterId, body) => {
   return await fetch(`${base}/renter/${renterId}/extension`, postOption())
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));
};

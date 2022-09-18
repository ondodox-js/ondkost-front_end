const base = 'http://localhost:8083/v2';
const headers = {
   Accept: 'application/json',
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*',
};

//type-room
export const findOneTypeStock = async typeId => {
   return await fetch(`${base}/type-room/${typeId}/room-stock`)
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const findAllType = async () => {
   return await fetch(`${base}/type-room`)
      .then(resp => resp.json())
      .then(result => result || [])
      .catch(err => console.log(err));
};

export const createTypeRoom = async body => {
   return await fetch(`${base}/type-room`, {
      headers,
      body: JSON.stringify(body),
      method: 'post',
   })
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

//room
export const createRoom = async (typeId, body) => {
   return await fetch(`${base}/type-room/${typeId}/room`, {
      headers,
      body: JSON.stringify(body),
      method: 'post',
   })
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const deleteRoom = async (typeId, roomId) => {
   return await fetch(`${base}/type-room/${typeId}/room/${roomId}`, {
      method: 'DELETE',
   })
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const findAllRoomByType = async typeId => {
   return await fetch(`${base}/type-room/${typeId}/room`)
      .then(resp => resp.json())
      .then(result => result || [])
      .catch(err => console.log(err));
};

export const findAllRoomByTypeAndStatus = async (typeId, status) => {
   return await fetch(`${base}/type-room/${typeId}/room-status/${status}`)
      .then(resp => resp.json())
      .then(result => result || [])
      .catch(err => console.log(err));
};

//renter
export const createRenter = async (roomId, body) => {
   return await fetch(`${base}/room/${roomId}/renter`, {
      headers,
      body: JSON.stringify(body),
      method: 'post',
   })
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const findAllRenterByTypeAndActive = async typeId => {
   return await fetch(`${base}/type-room/${typeId}/renter`)
      .then(resp => resp.json())
      .then(result => result || {})
      .catch(err => console.log(err));
};

export const findRenterDesc = async renterId => {
   return await fetch(`${base}/renter/${renterId}/desc`)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => {
         console.log(err, 'error, get renter desc');
         return {};
      });
};

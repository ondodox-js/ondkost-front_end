const base = 'http://localhost:8083';
const headers = {
   Accept: 'application/json',
   'Content-Type': 'application/json',
};

const getAllRoomId = async () => {
   const result = await fetch(`${base}/room/all-id`)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));
   return result || [];
};

const getCardRoom = async roomId => {
   const result = await fetch(`${base}/room/${roomId}/card`)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));

   return result || {};
};

const insertRoom = async body => {
   const result = await fetch(`${base}/room`, {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
   })
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));

   return result || null;
};

const getRoomByTypeAndStatus = async (typeId, status) => {
   let uri = `${base}/room/${typeId}/${status ? 'available' : 'not-available'}`;
   const result = await fetch(uri)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));

   return result || [];
};

export { getAllRoomId, getCardRoom, insertRoom, getRoomByTypeAndStatus };

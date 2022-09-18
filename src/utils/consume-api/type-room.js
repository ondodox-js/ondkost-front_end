const base = 'http://localhost:8083';
const headers = {
   Accept: 'application/json',
   'Content-Type': 'application/json',
};

const insertTypeRoom = async body => {
   const init = {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
   };

   const result = await fetch(`${base}/type-room`, init)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));

   return result || false;
};

const getAllTypeRoomId = async () => {
   const result = await fetch(`${base}/type-room/all-id`)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));

   return result || [];
};

const getAllTypeRoom = async () => {
   const result = await fetch(`${base}/type-room`)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => alert(err));

   return result || [];
};

const getCardType = async typeId => {
   const result = await fetch(`${base}/type-room/${typeId}/card`)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));

   return result || {};
};

export { insertTypeRoom, getAllTypeRoomId, getCardType, getAllTypeRoom };

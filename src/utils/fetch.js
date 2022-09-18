const base = 'http://localhost:8083';

export const insertTypeRoom = async body => {
   const init = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
   };

   const result = await fetch(`${base}/type-room`, init)
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));

   return result || false;
};

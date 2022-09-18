const base = 'http://localhost:8083';
const headers = {
   Accept: 'application/json',
   'Content-Type': 'application/json',
};

export const saveRenter = async body => {
   return await fetch(`${base}/renter`, {
      headers,
      body: JSON.stringify(body),
      method: 'post',
   })
      .then(resp => resp.json())
      .then(result => result)
      .catch(() => false);
};

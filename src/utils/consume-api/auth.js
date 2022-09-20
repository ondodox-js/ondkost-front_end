const base = 'http://localhost:8083';
const headers = {
   Accept: 'application/json',
   'Content-Type': 'application/x-www-form-urlencoded',
   'Access-Control-Allow-Origin': '*',
};

//auth
export const login = async body => {
   const formData = new URLSearchParams(body);
   return await fetch(`${base}/auth/login`, {
      headers,
      body: formData,
      method: 'post',
   })
      .then(resp => resp.json())
      .then(result => result)
      .catch(err => console.log(err));
};

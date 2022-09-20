export const getToken = () => {
   let tokens = JSON.parse(localStorage.getItem('tokens'));
   return `Bearer ${tokens.access_token}`;
};

export const logout = () => {
   localStorage.clear();
};

export const getOption = () => {
   const Authorization = getToken();

   return {
      headers: {
         Authorization,
      },
   };
};

export const postOption = body => {
   const Authorization = getToken();

   return {
      headers: {
         Authorization,
         'Content-Type': 'application/json',
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
      method: 'post',
   };
};

export const deleteOption = () => {
   const Authorization = getToken();

   return {
      headers: {
         Authorization,
      },
      method: 'delete',
   };
};

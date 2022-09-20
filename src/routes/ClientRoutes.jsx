import React, { useContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { SubTitle } from '../components/typographys';
import { Label, Input, Button } from '../components/ui';
import NotFound from '../pages/NotFound';
import { navClient } from '../utils/constants';
import { login } from '../utils/consume-api/auth';

function LoginOwnerPage() {
   let { setLoginState } = useContext(AuthContext);
   let [formState, setFormState] = useState({});

   let navigate = useNavigate();

   const handleOnSubmit = async e => {
      e.preventDefault();
      let tokens = await login(formState);
      if ('msg' in tokens) {
         alert('Login fail!');
      } else {
         localStorage.setItem('tokens', JSON.stringify(tokens));
         localStorage.setItem('login', true);
         setLoginState(true);
         navigate('/dashboard/new');
      }
   };
   return (
      <form onSubmit={handleOnSubmit} className="space-y-2" id="login-form">
         <SubTitle center>Login Owner</SubTitle>
         <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-1/2 space-y-2 p-1">
               <div>
                  <Label>Username</Label>
                  <Input
                     type="text"
                     placeholder="johnkennedy10"
                     onKeyUp={e => {
                        setFormState({
                           ...formState,
                           username: e.target.value,
                        });
                     }}
                     name="username"
                  />
               </div>
               <div>
                  <Label>Password</Label>
                  <Input
                     type="password"
                     placeholder="****"
                     onKeyUp={e => {
                        setFormState({
                           ...formState,
                           password: e.target.value,
                        });
                     }}
                     name="password"
                  />
               </div>
               <div className="text-right">
                  <Button>Login</Button>
               </div>
            </div>
         </div>
      </form>
   );
}

function ClientRoutes() {
   return (
      <Routes>
         {navClient.map(item => (
            <Route path={item.path} element={item.component} key={item.name} />
         ))}
         <Route path="/login" element={<LoginOwnerPage />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
}

export default ClientRoutes;

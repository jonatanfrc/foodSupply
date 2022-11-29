import api from "./api";
  async function authenticateUser(email, password) {

   const user = {
      "email": email,
      "senha": password
   }

   return api.post('usuarios/login', user)
      .then((res)=>{
      if(!res.data.erro) {
         localStorage.setItem('token', res.data.token)
         return res.data;  
      } else {
         console.log('err', res);
      }});
   }

  async function registerUser(email, username, imageName, password) {

   const user = {
      "email": email,
      "usuario": username,
      "senha": password,
      "foto": imageName
   }

   return api.post('usuarios/registro', user)
      .then((res)=>{
      if(!res.data.erro) {
         return res.data;
      } else {
         console.log('err', res);
         return res.data;
      }});
   }

export default {authenticateUser, registerUser};

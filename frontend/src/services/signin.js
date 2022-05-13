import api from "./api";

  async function authenticateUser(email, password) {

      const user = {
         "email": email,
         "senha": password
      }
               return api.post('/login', user)
       .then((res)=>{
         if(!res.data.erro) {
            console.log('deu cierto', res);
         } else {
            console.log('azar ein', res);
         }});
      }

export default authenticateUser;

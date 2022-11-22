import api from "./api";

   const token = localStorage.getItem('token')

   let config = {
      headers: {
         'x-token': token,
         'Content-Type': 'application/json'
      }
    }

  async function getAllAdress() {
   return api.get('produtos/')
      .then((res)=>{
         if(!res.data.erro) {
            return res.data;  
         } else {
            console.log('err', res);
         }}
      );
   }

   async function registerAdress(cep, uf, cidade, bairro, endereco, numero, principal) {

      const data = {
         "cep": cep,
         "uf": uf,
         "cidade": cidade,
         "bairro": bairro,
         "endereco": endereco,
         "numero": numero,
         "principal": principal,
      }

      return api.post('usuarios/cadastrar_endereco', data, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
      }

   async function getUserAdress() {
      console.log('config', config);
      return api.get('usuarios/listar_enderecos', config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
      }


 export default {getAllAdress, registerAdress, getUserAdress};

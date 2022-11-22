import api from "./api";
  async function getAllSellers() {

   return api.get('vendedores/')
      .then((res)=>{
         if(!res.data.erro) {
            return res.data;  
         } else {
            console.log('err', res);
         }});
      }

export default {getAllSellers};

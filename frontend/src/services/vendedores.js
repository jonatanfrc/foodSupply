import api from "./api";

   const token = localStorage.getItem('token')

   let config = {
      headers: {
         'x-token': token,
         'Content-Type': 'application/json'
      }
   }

  async function getAllSellers() {
   return api.get('vendedores/', config)
      .then((res)=>{
         if(!res.data.erro) {
            return res.data;  
         } else {
            console.log('err', res);
         }});
      }

   async function putDefineSellerName(nome_vendedor) {
      const data = {
         nome_vendedor: nome_vendedor
      }

      return api.put('vendedores/definir_nome', data, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
      }

export default {getAllSellers, putDefineSellerName};

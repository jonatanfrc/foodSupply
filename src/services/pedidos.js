import api from "./api";

   const token = localStorage.getItem('token')

   let config = {
      headers: {
         'x-token': token,
         'Content-Type': 'application/json'
      }
    }

  async function getAllRequest() {
   return api.get('pedidos/', config)
      .then((res)=>{
         if(!res.data.erro) {
            return res.data;  
         } else {
            console.log('err', res);
         }}
      );
   }

   async function postRequest(idEndereco, carrinho) {

      console.log('cart', carrinho);
   
      let itens = [];
   
      carrinho.map(item =>{
         itens.push({id: item.id, quantidade: item.qtd, valor: item.value})
      })
   
      console.log('carrinho final', itens)
   
      const data = {
         "vendedor": carrinho[0].idVendedor,
         "endereco": idEndereco,
         "produtos": itens
      }
   
      return api.post('pedidos', data, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
     }

   async function postAcceptShipping(pedidoID) {

      console.log('config', config);
   
      return api.post(`pedido/aceitar_frete/${pedidoID}`, {}, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
     }

   async function putDenyShipping(pedidoID) {
   
      return api.put(`pedido/rejeitar_frete/${pedidoID}`, {}, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
     }

   async function getInfRequest(pedidoID) {
   
      return api.get(`pedido/${pedidoID}`, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
     }

     
 export default { getAllRequest, postRequest, postAcceptShipping, putDenyShipping, getInfRequest};

import api from "./api";

   const token = localStorage.getItem('token')

   let config = {
      headers: {
         'x-token': token,
         'Content-Type': 'application/json'
      }
    }



//   async function comprar(idVendedor) {

   
//    const data = {
//       "vendedor": idVendedor,
//       "endereco": 4,
//       "produtos": [
//          {
//             "id": 4,
//             "quantidade": 100,
//             "valor": 120.5
//          }
//       ]
//    }

//    return api.get('pedidos/', data, config)
//       .then((res)=>{
//          if(!res.data.erro) {
//             return res.data;  
//          } else {
//             console.log('err', res);
//          }}
//       );
   

export default {comprar};

import api from "./api";

   const token = localStorage.getItem('token')

   let config = {
      headers: {
         'x-token': token,
         'Content-Type': 'application/json'
      }
    }

    async function getAllSales() {
      return api.get('vendas/', config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
      }

   async function putShippingValue(idVenda, valorFrete) {
      const data = {
         frete: parseFloat(valorFrete)
      }

      return api.put(`venda/${idVenda}/add_valor_frete`, data, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
      }

   async function putShippingInf(idVenda, urlRastreio, codigoRastreio) {

      const data = {
         url_rastreio: urlRastreio,
         rastreio: codigoRastreio,
      }

      return api.put(`venda/${idVenda}/enviar`, data, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
      }

   async function putRequestDelivered(idVenda) {
      return api.put(`venda/${idVenda}/entregue`, {}, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
      }
      
export default {getAllSales, putShippingValue, putShippingInf, putRequestDelivered};

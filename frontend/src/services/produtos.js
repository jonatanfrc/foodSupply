import api from "./api";

   const token = localStorage.getItem('token')

   let config = {
      headers: {
         'x-token': token,
         'Content-Type': 'application/json'
      }
    }

  async function getAllProducts() {
   return api.get('produtos/')
      .then((res)=>{
         if(!res.data.erro) {
            return res.data;  
         } else {
            console.log('err', res);
         }}
      );
   }

   async function registerProduct(sku, titulo, descricao, estoque, preco, categoria_id, medida_id, fotos) {

      const data = {
         "sku": sku,
         "titulo": titulo,
         "descricao": descricao,
         "estoque": estoque,
         "preco": preco,
         "categoria_id": categoria_id,
         "medida_id": medida_id,
         "fotos": [
            {
               "url": fotos,
               "ordem": 0
            }
         ]
      }

      return api.post('produtos/', data, config)
         .then((res)=>{
            if(!res.data.erro) {
               return res.data;  
            } else {
               console.log('err', res);
            }}
         );
      }

      async function getCategories() {
         return api.get('produtos/categorias', config)
            .then((res)=>{
               if(!res.data.erro) {
                  return res.data;  
               } else {
                  console.log('err', res);
               }}
            );
         }

      async function getUnidadesMedida() {
         return api.get('produtos/unidades_medida')
            .then((res)=>{
               if(!res.data.erro) {
                  return res.data;  
               } else {
                  console.log('err', res);
               }}
            );
         }

      async function getProdutosVendedor(idVendedor) {
         return api.get('produtos/vendedor/' + idVendedor, config)
            .then((res)=>{
               console.log('entrou', res);
               if(!res.data.erro) {
                  return res.data;  
               } else {
                  console.log('err', res);
               }}
            );
         }

 export default {getAllProducts, registerProduct, getCategories, getUnidadesMedida, getProdutosVendedor};

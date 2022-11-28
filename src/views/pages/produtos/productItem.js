import React, { useState, useEffect, useContext } from "react";
// import "../styles/cart.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import api from "../../../services/produtos"
import { CardActionArea, Grid } from '@mui/material';
import { CartContext } from './context/cart';
import { Button } from '@mui/material';

const ProductItem = ({ products, idVendedor }) => {
  const {
    productsCart = [],
    addProducToCart,
    removeProductToCart,
    clearCart,
  } = useContext(CartContext);

  useEffect(() => {
    console.log('prodcts', products);
    console.log('idVendedor', idVendedor);
  }, [products]);


  return (
    <>
      {products.map((item, index) => (
        <div className="cart_box" key={item.id}>
          <Card key={index} sx={{ maxWidth: "100%", marginBottom: '10px' }}>
            <CardContent>
              <div>
                <div className='div-fornecedor-option'>
                  <img className='img-fornecedor' height={65} width={65} src={item.fotos[0].url} />
                </div>
                <div className='div2-fornecedor-option'>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                  </Typography>
                </div>

                {item.estoque > 0 ?
                  <div style={{ display: "inline-block" }}>
                    <div>
                      <Button onClick={() => addProducToCart(item.id, idVendedor, item.preco, item.fotos[0].url)}>+</Button>
                    </div>
                    <div>
                      <Button onClick={() => removeProductToCart(item.id)}>-</Button>
                    </div>
                  </div>

                  : <div style={{marginLeft: '100px', marginTop: 30, position: 'absolute', display: 'inline-block'}}>
                    <Typography gutterBottom variant="h5" component="div">
                      Produto sem estoque!
                    </Typography>
                  </div>}






              </div>
            </CardContent>
          </Card>

        </div>
      ))}
    </>
  );
};

export default ProductItem;

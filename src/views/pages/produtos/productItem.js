import React, { useState, useEffect, useContext } from "react";
// import "../styles/cart.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import api from "../../../services/produtos"
import { CardActionArea, Grid } from '@mui/material';
import { CartContext } from './context/cart';
import { Button } from '@mui/material';

const ProductItem = ({ products}) => {
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const {
    productsCart = [],
    addProducToCart,
    removeProductToCart,
    clearCart,
  } = useContext(CartContext);

  useEffect(() => {
    let value = 0;
    console.log('productsCart', productsCart);

    productsCart.forEach(element => {
      value += element.qtd * element.value;
    });

    setPrice(value);
  }, [productsCart]);

  return (
    <article>
      {products.map((item, index) => (
        <div className="cart_box" key={item.id}>
          <Card key={index} sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                <CardContent>
                    <div>
                        <div className='div-fornecedor-option'>
                            <img className='img-fornecedor' height={65} width={65} src={item.fotos[0].url}/>
                        </div>
                        <div className='div2-fornecedor-option'>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            R$ {item.preco}
                            </Typography>
                        </div>

                        <div style={{ display: "inline-block"}}>
                            <div>
                                <Button onClick={() => addProducToCart(item.id, item.preco)}>+</Button>
                            </div>
                            <div>
                                <Button onClick={() => removeProductToCart(item.id)}>-</Button>
                            </div>
                       
                        </div>
                        <div style={{ display: "inline-block"}}>
                          <span>{ productsCart.find(product => {if(product.id == item.id){
                            return product.qtd }}
                            )}</span>
                        </div>
                    </div>
                </CardContent>
        </Card>
       
        </div>
      ))}
      <div className="total">
        <span>Total do seu carrinho: </span>
        <span>R$ - {price == undefined ? 0 : price}</span>
        {/* <div>
            <Button onClick={() => Buy()}  style={{ backgroundColor:'black' }}>Comprar</Button>
        </div> */}
      </div>
      <div>
          <Button onClick={() => clearCart()}  style={{ backgroundColor:'black' }}>Limpar carrinho</Button>
      </div>
    </article>
  );
};

export default ProductItem;

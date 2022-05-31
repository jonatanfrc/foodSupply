import React, { useState, useEffect } from "react";
// import "../styles/cart.css";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { CircularProgress, Button } from '@mui/material';

const ProductItem = ({ products}) => {
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);


  const handleRemove = (id) => {
    const arr = products.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
  };

  const Comprar = () => {
    
  };


  const handleChange = (item, d) => {
    let addCart = cart;
    addCart.push(item);
    let itemPrice = 0;
    
    addCart.forEach(item=>{
        itemPrice += item.preco;
        return itemPrice;
    })
    console.log('teste', itemPrice);
    setPrice(itemPrice);
    setCart(addCart);
    localStorage.setItem('cart', cart);
};

  const handlePrice = () => {
      console.log('cart2', cart)
    let ans = 0;
    products.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };

  useEffect(() => {
      console.log('cart', cart);
    handlePrice();
  }, [cart]);

  return (
    <article>
      {products.map((item, index) => (
        <div className="cart_box" key={item.id}>
          <Card key={index} sx={{ maxWidth: "100%", marginBottom: '10px' }}>
            <CardActionArea >
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
                            <div style={{ display: "inline-block" }}>
                                <Button onClick={() => handleChange(item, 1)}>+</Button>
                            </div>
                       
                        </div>
                        
                        {/* <div className='div-fornecedor-option' style={{ marginLeft: '35vw'}}>
                            <div className='div-fornecedor-option'>
                                <div className='teste'>
                                    <Button>+</Button>
                                </div>
                                <div>
                                    <Button>-</Button>
                                </div>
                            </div>
                            <div className='div-fornecedor-option'>
                                <Typography>1</Typography>
                            </div>
                        </div> */}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
       
        </div>
      ))}
      <div className="total">
        <span>Total do seu carrinho: </span>
        <span>R$ - {price == undefined ? 0 : price}</span>
        <div>
            <Button onClick={() => Comprar()}  style={{ backgroundColor:'black' }}>Comprar</Button>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;

import { useEffect, useState, useContext } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/produtos"
import { CircularProgress, Button } from '@mui/material';
import ProductItem from "./productItem"
import { CartContext } from './context/cart';
import './style/dashboard.css';
// material-ui
import { gridSpacing } from 'store/constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { flexbox } from '@mui/system';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const ListagemProduto = () => {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
    const {
        productsCart = [],
        addProducToCart,
        removeProductToCart,
        clearCart,
    } = useContext(CartContext);

    const navigate = useNavigate();
    const props = useLocation();

    function Buy() {
        navigate('/pedido/selecionaEndereco')
    }

    useEffect(() => {
        if(props.state){
            api.getProdutosVendedor(props.state).then((response) => {

                response.retorno.forEach(element => {
                    element.fotos = JSON.parse(element.fotos);
                });

                setProducts(response.retorno);
                setLoading(false);
            }).catch((err) => {
                console.log('err', err)
                setLoading(false);
            });
        }else{
            navigate('/listagem/vendedores')
        }
    }, []);

    useEffect(() => {
        
        let value = 0;

        productsCart.forEach(element => {
            value += element.qtd * element.value;
        });

        setPrice(value);
    }, [productsCart]);

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <h3>Produtos</h3>

                    <Grid item xs={12}>
                        <ProductItem products={products} idVendedor={props.state} />
                        <div className="total">
                            <span>Total do seu carrinho: </span>
                            <span>R$ {price == undefined ? 0 : price}</span>
                            <div style={{ display: '-webkit-box'}}>
                                <div>
                                    <Button onClick={() => Buy()}>Comprar</Button>
                                </div>
                                <div>
                                    <Button variant="contained" style={{backgroundColor: '#673ab7'}} onClick={() => clearCart()}>Limpar carrinho</Button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </>)
            }
        </>
    );
};

export default ListagemProduto;

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
    const [cart, setCart] = useState([]);
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

    // const handleClick = (item) => {
    //     if (cart.indexOf(item) !== -1) return;
    //     setCart([...cart, item]);
    // };

    /*
        {
            "id": 3,
            "sku": "ProdTeste1",
            "titulo": "Produto de teste 1",
            "descricao": "Este é o teste de descrição do produto, pode dar tudo errado ou tudo certo, vai la saber",
            "preco": 140.5,
            "estoque": 100,
            "fotos": "[
                {\"url\":\"https://talcha.vteximg.com.br/arquivos/ids/170030-1000-1000/teste.jpg?v=637685222639430000\",\"ordem\":0},
                {\"url\":\"https://static3.tcdn.com.br/img/img_prod/99941/produto_teste_auaha_24522_1_f816ad73890b2db46e6e460c44ae5d22.png\",\"ordem\":1}
            ]",
            "data_hora_cadastro": "2022-05-13T05:18:14.000Z",
            "categoria_id": 1,
            "categoria_nome": "Carnes",
            "unidade_medida_id": 2,
            "unidade_medida_sigla": "G",
            "unidade_medida_nome": "Gramas",
            "vendedor_id": 9,
            "nome_vendedor": "Vitor Store"
        }
    */

    useEffect(() => {
        api.getProdutosVendedor(props.state).then((response) => {
            setProducts(response.retorno);
            setLoading(false);
        }).catch((err) => {
            console.log('err', err)
            setLoading(false);
        });
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
                                    <Button onClick={() => Buy()} style={{ backgroundColor: '#673ab7', color: 'White' }}>Comprar</Button>
                                </div>
                                <div>
                                    <Button onClick={() => clearCart()} style={{ backgroundColor: '#673ab7', color: 'White', marginLeft: 10}}>Limpar carrinho</Button>
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

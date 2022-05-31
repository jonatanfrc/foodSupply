import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import api from "../../../services/produtos"
import { CircularProgress, Button } from '@mui/material';
import ProductItem from "./productItem"

import './style/dashboard.css';
// material-ui
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const ListagemProduto = () => {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);


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
        api.getAllProducts().then((response) =>{
            setProducts(response.retorno);
            setLoading(false);
        }).catch((err) =>{
            console.log('err', err)
            setLoading(false);
        });
        setLoading(false);
    }, []);

    return (
        <>
            { isLoading ? ( 
                    <div className='loader'>
                        <CircularProgress/>
                    </div> 
                    ) : (
                    <>
                        <h3>Produtos</h3>
                    
                        <Grid item xs={12}>
                            <ProductItem products={products}/>
                            {/* { products.map((product, index) =>
                                
                            )} */}
                        </Grid>
                </> )
                }

                
            </>
    );
};

export default ListagemProduto;

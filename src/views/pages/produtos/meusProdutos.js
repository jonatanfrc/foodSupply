import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import api from "../../../services/produtos"
import { CircularProgress } from '@mui/material';


import './style/dashboard.css';
// material-ui
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const MeusProdutos = () => {
    const [isLoading, setLoading] = useState(true);
    const [products, serProducts] = useState([]);

    useEffect(() => {
        const idUser = localStorage.getItem('userId');
        api.getProdutosVendedor(idUser).then((response) =>{
            serProducts(response.retorno);
            setLoading(false);
            console.log('2', response);
        }).catch((err) =>{
            console.log('err', err)
            setLoading(false);
        });
        setLoading(false);

        console.log('products', products);
    }, []);

    return (
        <>
            { isLoading ? ( 
                    <div className='loader'>
                        <CircularProgress/>
                    </div> 
                    ) : (

                    <>
                        <h3 style={{marginBottom: '10px'}}>Meus Produtos</h3>
                    
                        <Grid item xs={12}>
                            { products.map(product =>
                                <Card sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                                    <CardActionArea >
                                        <CardContent>
                                            <div>
                                                <div className='div-fornecedor-option'>
                                                    <img className='img-fornecedor' height={65} width={65} src={product.fotos[0].url}/>
                                                </div>
                                                <div className='div2-fornecedor-option'>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {product.titulo}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        R$ - {product.preco}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )}
                    </Grid>
                </> )
                }

                
            </>
    );
};

export default MeusProdutos;

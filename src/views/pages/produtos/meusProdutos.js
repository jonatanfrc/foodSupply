import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import api from "../../../services/produtos"
import { CircularProgress } from '@mui/material';
import './style/dashboard.css';
// material-ui

const MeusProdutos = () => {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const idUser = localStorage.getItem('userId');
        api.getProdutosVendedor(idUser).then((response) =>{
            response.retorno.forEach(element => {
                element.fotos = JSON.parse(element.fotos);
            });
            setProducts(response.retorno);
            setLoading(false);
        }).catch((err) =>{
            console.log('err', err)
            setLoading(false);
        });
    }, []);

    return (
        <>
            { isLoading ? ( 
                    <div className='loader'>
                        <CircularProgress/>
                    </div> 
                    ) : products.length > 0 ? (

                    <>
                        <h3 style={{marginBottom: '10px'}}>Meus Produtos</h3>
                    
                        <Grid item xs={12}>
                            { products.map((product, index) =>
                                <Card key={index} sx={{ maxWidth: "100%", marginBottom: '10px' }}>
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
                                                        {product.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Total em Estoque: {product.estoque}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )}
                    </Grid>
                </> 
                ) : (
                    <div>
                        <p style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Você não possui produtos ainda!</p>
                    </div>
                    )
                }
            </>
    );
};

export default MeusProdutos;

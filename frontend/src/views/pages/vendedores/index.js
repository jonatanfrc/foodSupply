import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import api from "../../../services/vendedores"
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './style/vendedores.css';
// material-ui
import { gridSpacing } from 'store/constant';

const ListagemVendedores = () => {
    const [isLoading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        api.getAllSellers().then((response) => {
            console.log('responsds', response.retorno)
            setSellers(response.retorno);
            setLoading(false);
        }).catch((err) => {
            console.log('err', err)
            setLoading(false);
        });
    }, []);

    const goToProducts = (sellerID) => {
        if (sellerID) {
            navigate('/listagem/produtos', { state: sellerID });
        }
    };

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <CircularProgress />
                </div>
            ) : sellers.length > 0 ? (
                <>
                    <h3 style={{ marginBottom: '10px' }}>Fornecedores</h3>

                    <Grid item xs={12} >
                        {sellers.map((seller, index) =>
                            seller.nome_vendedor != null && seller.nome_vendedor != '' && seller.nome_vendedor != undefined ?
                                <Card key={index} sx={{ maxWidth: "100%", marginBottom: '10px' }} >
                                    <CardActionArea onClick={() => goToProducts(seller.id)}>
                                        <CardContent>
                                            <div>
                                                <div className='div-fornecedor-option'>
                                                    <img className='img-fornecedor' height={65} width={65} src={seller.foto} />
                                                </div>
                                                <div className='div2-fornecedor-option'>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {seller.nome_vendedor}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {seller.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                : <div key={index}> </div>
                        )}
                    </Grid>
                </>) : (
                <div>
                    <p style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Não há fornecedores disponíveis!</p>
                </div>
            )
            }

        </>
    );
};

export default ListagemVendedores;

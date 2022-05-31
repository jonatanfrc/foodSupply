import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import api from "../../../services/vendedores"
import { CircularProgress } from '@mui/material';


import './style/dashboard.css';
// material-ui
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        api.getAllSellers().then((response) =>{
            setSellers(response.retorno);
            setLoading(false);
            console.log('2', response);
        }).catch((err) =>{
            console.log('err', err)
            setLoading(false);
        });
        setLoading(false);

        console.log('sellers', sellers);
    }, []);

    return (
        <>
            { isLoading ? ( 
                    <div className='loader'>
                        <CircularProgress/>
                    </div> 
                    ) : (

                    <>
                        <h3 style={{marginBottom: '10px'}}>Fornecedores</h3>
                    
                        <Grid item xs={12}>
                            { sellers.map(seller =>
                                seller.nome_vendedor != null && seller.nome_vendedor != '' && seller.nome_vendedor != undefined ?
                                <>
                                    <Card sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                                        <CardActionArea >
                                            <CardContent>
                                                <div>
                                                    <div className='div-fornecedor-option'>
                                                        <img className='img-fornecedor' height={65} width={65} src="https://www.adobe.com/br/express/create/logo/media_110644df1c87d30589ad9857d1410208b6482580c.png?width=400&format=png&optimize=medium"/>
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
                                </>
                                : <></>
                            )}
                    </Grid>
                </> )
                }

                
            </>
    );
};

export default Dashboard;

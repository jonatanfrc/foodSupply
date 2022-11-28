import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Button } from '@mui/material';
import api from "../../../services/venda"
import { CircularProgress } from '@mui/material';
import './style/dashboard.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const MinhasVendas = () => {
    const [isLoading, setLoading] = useState(true);
    const [vendas, setVendas] = useState([]);
    const navigate = useNavigate();

    const goToFrete = (idPedido, status) => {
        if(idPedido && status == 'Aguardando Confirmação do Vendedor'){
            navigate('/listagem/minhasVendas/defineValorFrete', { state: idPedido })
        }
        else if(idPedido && status == 'Pagamento Aprovado'){
            navigate('/listagem/minhasVendas/defineInfRastreio', { state: idPedido })
        }
    }

    const pedidoEntregue = (idPedido, status) => {
        console.log('entrouzzz', status)
        if(idPedido && status == 'Pedido Enviado'){
            api.putRequestDelivered(idPedido).then((response) =>{
                if(!response.error){
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Pedido definido como entregue!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/listagem/minhasVendas')
                }
                console.log('response enviar', response);
                setLoading(false);
            }).catch((err) =>{
                Swal.fire({
                    title: 'Oops!',
                    text: 'Algo deu errado!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
                console.log('err', err)
                setLoading(false);
            });
            
        }

    }

    useEffect(() => {
        api.getAllSales().then((response) =>{
            console.log('response frete', response);
            setVendas(response.pedidos);
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
                    ) : vendas.length > 0 ? (

                    <>
                        <h3 style={{marginBottom: '10px'}}>Minhas Vendas</h3>
                    
                        <Grid item xs={12}>
                            { vendas.map((pedido, index) =>
                                <Card key={index} sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                                    <CardActionArea onClick={() => goToFrete(pedido.id, pedido.descricao_status)}>
                                        <CardContent>
                                            <div style={{ display: 'inline-flex' }}>
                                                <div className='div2-fornecedor-option'>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {pedido.descricao_status == "Aguardando Confirmação do Vendedor" ? 'Venda aguardando o valor do frete' : pedido.descricao_status == 'Pagamento Aprovado' ? 'Pagamento Aprovado - Aguardando informações de rastreio' : pedido.descricao_status}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {pedido.valor_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                                    </Typography>
                                                </div>
                                                <div style={ pedido.descricao_status == "Pedido Enviado" ? { display: 'flex', marginLeft: 100 } : { display: 'none' }}>
                                                    <div>
                                                        <Button onClick={() => pedidoEntregue(pedido.id, pedido.descricao_status)} style={{ backgroundColor: 'purple' }}>Pedido entregue</Button>
                                                    </div>
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
                        <p style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Você não possui vendas ainda!</p>
                    </div>
                    )
                }
            </>
    );
};

export default MinhasVendas;

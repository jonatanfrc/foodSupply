import { useEffect, useState } from 'react';
import { CardActionArea, Grid, Button, CircularProgress, Typography, CardContent, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from "../../../services/pedidos"
import Swal from 'sweetalert2'
import './style/dashboard.css';
// material-ui

const MeusPedidos = () => {
    const [isLoading, setLoading] = useState(true);
    const [pedidos, setPedidos] = useState([]);
    let navigate = useNavigate();

    const goToInfPedido = (idPedido, status) => {
        if(status !== "Aguardando Comprador"){
            navigate('/listagem/meusPedidos/informacoesPedido', { state: idPedido })
        }
    }

    const aceitarFrete = (pedidoID) => {

        api.postAcceptShipping(pedidoID).then((response) => {
            console.log('response1', response);
            if (!response.error) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Frete aceito com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.open(response.retorno.url);
                window.location.reload();
            }
            setLoading(false);
        }).catch((err) => {
            Swal.fire({
                title: 'Oops!',
                text: 'Algo deu errado!',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            console.log('err', err)
            setLoading(false);
        });
    };
    const negarFrete = (pedidoID) => {
        api.putDenyShipping(pedidoID).then((response) => {
            if(!response.error){
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Frete recusado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            window.location.reload();
            console.log('response2', response);
            setLoading(false);
        }).catch((err) => {
            Swal.fire({
                title: 'Oops!',
                text: 'Algo deu errado!',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            console.log('err', err)
            setLoading(false);
        });
    };

    useEffect(() => {
        api.getAllRequest().then((response) => {
            console.log('response', response);
            setPedidos(response.pedidos);
            setLoading(false);
        }).catch((err) => {
            console.log('err', err)
            setLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <CircularProgress />
                </div>
            ) : pedidos.length > 0 ? (

                <>
                    <h3 style={{ marginBottom: '10px' }}>Meus Pedidos</h3>

                    <Grid item xs={12}>
                        {pedidos.map((pedido, index) =>
                            <Card key={index} sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                                <CardActionArea onClick={() => goToInfPedido(pedido.id, pedido.descricao_status)}>
                                    <CardContent >
                                        <div style={{ display: 'flex' }}>
                                            <div className='div2-fornecedor-option'>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {pedido.nome_vendedor} - Valor total: {pedido.valor_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {pedido.descricao_status}
                                                </Typography>
                                            </div>
                                            <div style={ pedido.descricao_status !== 'Aguardando Comprador' || pedido.valor_frete == 0 ? { display: 'none' } : { marginLeft: '35%'}}>
                                                <div style={{textAlign: 'center'}}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Valor do frete: {pedido.valor_frete.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                                    </Typography>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <div>
                                                        <Button variant="contained" style={{backgroundColor: '#673ab7'}} onClick={() => aceitarFrete(pedido.id)}>Aceitar Frete</Button>
                                                    </div>
                                                    <div style={{ marginLeft: '20px' }}>
                                                        <Button variant="contained" style={{backgroundColor: '#673ab7'}} onClick={() => negarFrete(pedido.id)}>Negar Frete</Button>
                                                    </div>
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
                    <p style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Você não possui pedidos ainda!</p>
                </div>
            )
            }
        </>
    );
};

export default MeusPedidos;

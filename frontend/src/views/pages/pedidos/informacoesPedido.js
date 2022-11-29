import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/pedidos"
import Box from '@mui/material/Box';
import { CircularProgress, Button, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './style/dashboard.css';
// material-ui

const InformacoesPedido = () => {
    const [isLoading, setLoading] = useState(false);
    const [pedido, setPedido] = useState({});
    
    const props = useLocation();

    const getInfPedido = () => {
        setLoading(true);

        api.getInfRequest(props.state).then((response) =>{
            response.retorno.valor_total = response.retorno.valor_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            setPedido(response.retorno)
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

    };

    useEffect(() => {
        getInfPedido();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <CircularProgress />
                </div>
            ) : (

                <>
                    <h3>Informações de pedido</h3>

                    <Grid item xs={12}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '35vw', minWidth: '200px'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    disabled={true}
                                    label="Situação pedido"
                                    value={pedido.descricao_status ? pedido.descricao_status : 'Não disponível'}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    disabled={true}
                                    label="Vendedor"
                                    value={pedido.nome_vendedor ? pedido.nome_vendedor : 'Não disponível'}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    disabled={true}
                                    label="Código de rastreio"
                                    value={pedido.rastreio && pedido.rastreio !== "null"  ? pedido.rastreio : 'Não disponível'}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    disabled={true}
                                    label="Valor total"
                                    value={pedido.valor_total ? pedido.valor_total : 'Não disponível'}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    disabled={true}
                                    label="URL de rastreio"
                                    value={pedido.url_rastreio && pedido.url_rastreio !== "null" ? pedido.url_rastreio : 'Não disponível'}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    disabled={true}
                                    label="URL de pagamento"
                                    value={pedido.url_pagamento && pedido.url_pagamento !== "null" ? pedido.url_pagamento : 'Não disponível'}
                                />
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default InformacoesPedido;

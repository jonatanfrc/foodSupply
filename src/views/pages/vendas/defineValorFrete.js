import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/venda"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CircularProgress, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './style/dashboard.css';
// material-ui

const DefineValorFrete = () => {
    const [isLoading, setLoading] = useState(false);
    const [valorFrete, setValorFrete] = useState('');
    
    let navigate = useNavigate();
    const props = useLocation();

    const putValorFrete = () => {
        setLoading(true);

        if(!valorFrete){
            Swal.fire({
                title: 'Oops!',
                text: 'Preencha o campo para definir o valor de frete!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setLoading(false);
            
            return
        }

        api.putShippingValue(props.state, valorFrete).then((response) =>{
            if(!response.error){
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Valor de frete definido com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/listagem/minhasVendas')
            }
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
    }, []);

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <CircularProgress />
                </div>
            ) : (

                <>
                    <h3>Valor Frete</h3>

                    <Grid item xs={12}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Digite o valor do frete para o pedido"
                                    onChange={(e) => setValorFrete(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button onClick={() => putValorFrete()} style={{ backgroundColor: 'purple' }}>Enviar valor de frete</Button>
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default DefineValorFrete;

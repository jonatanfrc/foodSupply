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

const DefineInfRastreio = () => {
    const [isLoading, setLoading] = useState(false);
    const [urlRastreio, setUrlRastreio] = useState('');
    const [codigoRastreio, setCodigoRastreio] = useState('');
    
    let navigate = useNavigate();
    const props = useLocation();

    const putInfRastreio = () => {
        setLoading(true);

        if(!urlRastreio || !codigoRastreio){
            Swal.fire({
                title: 'Oops!',
                text: 'Preencha todos os campos para enviar as informações de rastreio!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setLoading(false);
            
            return
        }

        api.putShippingInf(props.state, urlRastreio, codigoRastreio).then((response) =>{
            if(!response.error){
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Informações de rastreio definidas com sucesso!',
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
                    <h3>Definições de informações para rastreio</h3>

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
                                    label="Digite a URL para rastreio"
                                    onChange={(e) => setUrlRastreio(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Digite o código de rastreio"
                                    onChange={(e) => setCodigoRastreio(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button variant="contained" style={{backgroundColor: '#673ab7'}} onClick={() => putInfRastreio()}>Enviar informações de rastreio</Button>
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default DefineInfRastreio;

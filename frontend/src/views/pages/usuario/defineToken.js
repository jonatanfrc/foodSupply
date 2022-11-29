import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/usuario"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './style/dashboard.css';
// material-ui

const DefineToken = () => {
    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    
    let navigate = useNavigate();

    const definirToken = () => {
        setLoading(true);

        if(!token){
            Swal.fire({
                title: 'Oops!',
                text: 'Preencha o campo para cadastrar o token!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setLoading(false);

            return
        }

        api.putUserToken(token).then((response) =>{
            console.log('response', response);

            if(!response.erro){
                Swal.fire({
                    title: 'Sucesso!',
                    text: "Token cadastrado!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/usuario/configuracoes');
                    }
                })
            }

            setLoading(false);
        }).catch((err) =>{
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
                    <h3>Definição Token Mercado Pago</h3>

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
                                    label="Digite o token"
                                    onChange={(e) => setToken(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button onClick={() => definirToken()} style={{ backgroundColor: 'purple' }}>Definir/Alterar Token</Button>
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default DefineToken;

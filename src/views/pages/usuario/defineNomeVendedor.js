import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/vendedores"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CircularProgress, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './style/dashboard.css';
// material-ui

// ==============================|| DEFAULT DASHBOARD ||============================== //

const DefineNomeVendedor = () => {
    const [isLoading, setLoading] = useState(false);
    const [nomeVendedor, setNomeVendedor] = useState('');
    let navigate = useNavigate();
    
    const trocarNomeVendedor = () => {
        setLoading(true);

        if(!nomeVendedor){
            Swal.fire({
                title: 'Oops!',
                text: 'Preencha o campo para cadastrar o nome de vendedor!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setLoading(false);

            return
        }

        api.putDefineSellerName(nomeVendedor).then((response) =>{
            if(!response.error){      

                Swal.fire({
                    title: 'Sucesso!',
                    text: "Nome de vendedor cadastrado!",
                    icon: 'sucess',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Leve-me até lá!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/usuario/configuracoes');
                        window.location.reload();
                    }
                })

                localStorage.setItem('nomeVendedor', nomeVendedor);
                
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
                    <h3>Definição Nome de Vendedor</h3>

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
                                    label="Digite o nome para vendedor"
                                    onChange={(e) => setNomeVendedor(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button onClick={() => trocarNomeVendedor()} style={{ backgroundColor: 'purple' }}>Definir/Alterar nome vendedor</Button>
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default DefineNomeVendedor;

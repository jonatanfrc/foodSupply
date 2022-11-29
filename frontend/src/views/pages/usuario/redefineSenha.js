import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/usuario"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './style/dashboard.css';
// material-ui
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const CadastroEndereco = () => {
    const [isLoading, setLoading] = useState(false);
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
    
    let navigate = useNavigate();

    const changePassword = () => {
        setLoading(true);

        if(senha == confirmeSenha){
            api.putChangePassword(senha).then((response) =>{
                console.log('response', response);
                setLoading(false);
            }).catch((err) =>{
                console.log('err', err)
                setLoading(false);
            });
        }else{
            setLoading(false);
        }
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
                    <h3>Redefinição de Senha</h3>

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
                                    label="Digite a nova senha"
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Digite novamente a nova senha"
                                    onChange={(e) => setConfirmeSenha(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button variant="contained" style={{backgroundColor: '#673ab7'}} onClick={() => changePassword()}>Alterar Senha</Button>
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default CadastroEndereco;

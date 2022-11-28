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

const DefineToken = () => {
    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    
    let navigate = useNavigate();

    const definirToken = () => {
        setLoading(true);

        api.putUserToken(token).then((response) =>{
            console.log('response', response);
            alert(response.msg)
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

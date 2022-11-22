import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/usuario"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CircularProgress, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

import './style/dashboard.css';
// material-ui
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const SelecionaEndereco = () => {
    const [isLoading, setLoading] = useState(false);
    const [numero, setNumero] = useState('');
    const [principal, setPrincipal] = useState(false);
    let navigate = useNavigate();

    const getEnderecos = () => {
        api.getUserAdress().then((response) => {
            console.log('responsezz', response);
            if (!response.erro) {
                return
            }
            setLoading(false)
        }).catch((err) => {
            console.log('err', err)
            setLoading(false);
        });
    };

    const confirmRequest = () => {
        return
    }

    useEffect(() => {
        getEnderecos();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <CircularProgress />
                </div>
            ) : (

                <>
                    <h3>Selecione seu endereço</h3>

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
                                    id="outlined-number"
                                    label="Seelecione um endereço para compra"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button onClick={() => confirmRequest()} style={{ backgroundColor: 'purple' }}>Cadastrar</Button>
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default SelecionaEndereco;

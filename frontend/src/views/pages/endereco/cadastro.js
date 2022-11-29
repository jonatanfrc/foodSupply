import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/usuario"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './style/dashboard.css';
import axios from 'axios';
// material-ui

// ==============================|| DEFAULT DASHBOARD ||============================== //

const CadastroEndereco = () => {
    const [isLoading, setLoading] = useState(false);
    const [cep, setCep] = useState('');
    const [uf, setUF] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [principal, setPrincipal] = useState(false);
    let navigate = useNavigate();

    const registerAdress = () => {

        if(!cep || !uf || !cidade || !bairro || !endereco || !numero){
            Swal.fire({
                title: 'Oops!',
                text: 'Preencha todos campos para cadastrar o endereço!',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            
              return
        }


        api.registerAdress(cep, uf, cidade, bairro, endereco, numero, principal).then((response) => {
            if (!response.erro) {
                navigate('/listagem/produtos')
            }
            setLoading(false)
        }).catch((err) => {
            console.log('err', err)
            setLoading(false);
        });
    };

    const buscaEndereco = () => {
        if(cep.length == 8){
            setLoading(true);
            axios.get(`http://viacep.com.br/ws/${cep}/json/`).then((response)=> {
                console.log('responnn', response);
                if(!response.data.erro){
                    setCep(response.data.cep.replace(/\D/g, ""))
                    setBairro(response.data.bairro)
                    setCidade(response.data.localidade)
                    setEndereco(response.data.logradouro)
                    setUF(response.data.uf)
                }else{
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Erro ao buscar endereço!',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
                setLoading(false);
            }).catch((err) =>{
                Swal.fire({
                    title: 'Oops!',
                    text: 'Erro ao buscar endereço. Por favor, preencha Manualmente!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                console.log('erro', err);
                setLoading(false);
            })
        }
    };

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <CircularProgress />
                </div>
            ) : (

                <>
                    <h3>Cadastro de endereço</h3>

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
                                    type="number"
                                    value={cep}
                                    label="Digite o CEP"
                                    onBlur={() => buscaEndereco()}
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={uf}
                                    label="Digite o UF"
                                    onChange={(e) => setUF(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={cidade}
                                    label="Digite a cidade"
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={bairro}
                                    label="Digite a bairro"
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    value={endereco}
                                    label="Digite o endereço"
                                    onChange={(e) => setEndereco(e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Digite o número"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setNumero(e.target.value)}
                                />

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={principal} onChange={() => setPrincipal(!principal)} name="gilad" />
                                        }
                                        label="Definir como endereço principal"
                                    />
                                </FormGroup>
                                {/* <Checkbox
                                        checked={principal}
                                        onChange={(e) => setPrincipal(e.target.value)}
                                    >
                                        teste
                                    </Checkbox> */}


                            </div>
                            <div>
                                <Button variant="contained" style={{backgroundColor: '#673ab7'}} onClick={() => registerAdress()}>Cadastrar</Button>
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default CadastroEndereco;

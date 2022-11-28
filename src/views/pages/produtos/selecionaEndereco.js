import { useEffect, useState, useContext } from 'react';
import { Grid } from '@mui/material';
import apiUsuario from "../../../services/usuario"
import api from "../../../services/pedidos"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CircularProgress, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { CartContext } from './context/cart';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './style/dashboard.css';
// material-ui

const SelecionaEndereco = () => {
    const [isLoading, setLoading] = useState(false);
    const [listEnderecos, setListEnderecos] = useState([]);
    const [enderecoID, setEnderecoID] = useState('');
    let navigate = useNavigate();
    const {
        productsCart = [],
        addProducToCart,
        removeProductToCart,
        clearCart,
    } = useContext(CartContext);


    const getEnderecos = () => {
        apiUsuario.getUserAdress().then((response) => {
            setListEnderecos(response.retorno)
            console.log('responsezz', response);
            if (response.retorno.length == 0) {
                Swal.fire({
                    title: 'Erro?',
                    text: "Você não possui nenhum endereço cadastrado!",
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Leve-me até lá!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/cadastro/endereco')
                    }
                })
            }
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
        setLoading(true);

        if (!enderecoID) {
            Swal.fire({
                title: 'Oops!',
                text: 'Selecione um endereço para fazer endereço!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setLoading(false);

            return
        }

        api.postRequest(enderecoID, productsCart).then((response) => {
            console.log('response venda', response);
            if (!response.erro) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Pedido realizado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/listagem/meusPedidos')
            }

            setLoading(false)
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
                            <div style={{ marginBottom: 20 }}>
                                <TextField
                                    id="outlined-number"
                                    label="Selecione um endereço para compra"
                                    type="select"
                                    select={listEnderecos ? true : false}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setEnderecoID(e.target.value)}>
                                    {listEnderecos.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.cep} - {option.endereco}, {option.bairro}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <Button onClick={() => confirmRequest()} style={{ backgroundColor: 'purple' }}>Fazer pedido</Button>
                            </div>
                        </Box>
                    </Grid>
                </>)
            }
        </>
    );
};

export default SelecionaEndereco;

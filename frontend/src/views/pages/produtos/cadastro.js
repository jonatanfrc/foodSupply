import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from "../../../services/produtos"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CircularProgress, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import './style/dashboard.css';
// material-ui

const ListagemProduto = () => {
    const [isLoading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [unidadeMedida, setUnidadeMedida] = useState([]);
    const [sku, setSku] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [data_hora_cadastro, setDataHoraCadastro] = useState('');
    const [categoria_id, setCategoria_id] = useState('');
    const [unidade_medida_id, setUnidade_medida_id] = useState('');
    const [urlFoto, setUrlFoto] = useState('');
    let navigate = useNavigate();
    
    const registerProdcut = () => {

        setLoading(true);

        if(!sku || !titulo || !descricao || !estoque || !preco || !categoria_id || !unidade_medida_id || !urlFoto){
            Swal.fire({
                title: 'Oops!',
                text: 'Preencha todos campos para cadastrar o produto!',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
              setLoading(false);
              return
        }
       

        api.registerProduct(sku, titulo, descricao, estoque, preco, categoria_id, unidade_medida_id, urlFoto).then((response) =>{
            if(!response.erro){
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Produto cadastrado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/listagem/meusProdutos')
                setLoading(false)
            }
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
        api.getCategories().then((response) =>{
            setCategorias(response.retorno)
            setLoading(false);
        }).catch((err) =>{
            console.log('err', err)
            setLoading(false);
        });

        api.getUnidadesMedida().then((response) =>{
            setUnidadeMedida(response.retorno)
            setLoading(false);
        }).catch((err) =>{
            console.log('err', err)
            setLoading(false);
        });
    }, []);

    return (
        <>
            { isLoading ? ( 
                    <div className='loader'>
                        <CircularProgress/>
                    </div> 
                    ) : (

                    <>
                        <h3>Cadastro de produto</h3>
                    
                        <Grid item xs={12}>
                        
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '35vw', minWidth: '200px' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Digite o SKU"
                                    onChange={(e) => setSku(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Digite o Título"
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Digite a descrição"
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Digite a quantidade em estoque"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setEstoque(e.target.value)}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Digite o valor"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setPreco(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Digite a url da foto"
                                    onChange={(e) => setUrlFoto(e.target.value)}
                                />
                               
                                <TextField
                                    id="outlined-number"
                                    label="Selecione a categoria"
                                    type="select"
                                    select={categorias ? true : false}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setCategoria_id(e.target.value)}>
                                        {categorias.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                            {option.nome}
                                            </MenuItem>
                                        ))}
                                </TextField>


                                <TextField
                                    id="outlined-number"
                                    label="Selecione a unidade de medida"
                                    type="select"
                                    select={unidadeMedida}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setUnidade_medida_id(e.target.value)}>
                                        {unidadeMedida.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                            {option.sigla} - {option.nome}
                                            </MenuItem>
                                        ))}
                                </TextField>

                              
                                
                            </div>
                            
                            <div style={{ textAlign:'end', marginTop: 20}}>
                                <Button variant="contained" style={{backgroundColor: '#673ab7'}} onClick={() => registerProdcut()}>Cadastrar</Button>
                            </div>
                            </Box>
                    </Grid>
                </> )
                }

                
            </>
    );
};

export default ListagemProduto;

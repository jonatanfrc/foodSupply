import { useEffect, useState, useContext } from 'react';
import { CardActionArea, Grid } from '@mui/material';
import { CircularProgress, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import './style/dashboard.css';
// material-ui
import { useLocation, useNavigate } from 'react-router-dom';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const MenuUsuario = () => {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const props = useLocation();

    function goToTrocarSenha() {
        navigate('/usuario/configuracoes/redefinicaoSenha')
    }
    function goToDefinirNomeVendedor() {
        navigate('/usuario/configuracoes/defineNomeVendedor')
    }
    function goToDefinirToken() {
        navigate('/usuario/configuracoes/defineToken')
    }
    function goToCadastroEndereco() {
        navigate('/cadastro/endereco')
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <h3 style={{marginBottom: 20}}>Configurações de Usuário</h3>

                    <div className="cart_box">
                        <Card sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                            <CardActionArea onClick={() => goToTrocarSenha()}>
                                <CardContent>
                                    <div>
                                        <div className='div2-fornecedor-option'>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Trocar senha
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                            <CardActionArea onClick={() => goToDefinirNomeVendedor()}>
                                <CardContent>
                                    <div>
                                        <div className='div2-fornecedor-option'>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Definir Nome de Vendedor
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                            <CardActionArea onClick={() => goToDefinirToken()}>
                                <CardContent>
                                    <div>
                                        <div className='div2-fornecedor-option'>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Definir Token do Mercado Pago
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: "100%", marginBottom: '10px' }}>
                            <CardActionArea onClick={() => goToCadastroEndereco()}>
                                <CardContent>
                                    <div>
                                        <div className='div2-fornecedor-option'>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Cadastro de Endereço
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </>)
            }
        </>
    );
};

export default MenuUsuario;

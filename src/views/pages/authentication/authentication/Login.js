import React, { useState } from "react";
import "./style/login.css"
import metaLogo from "../../../../assets/meta-logo.png"
import userAPI from "../../../../services/signin"

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, useMediaQuery } from '@mui/material';
import { useNavigate} from 'react-router-dom';

// project imports
import AuthWrapper1 from '../AuthWrapper1';

// ================================|| AUTH3 - LOGIN ||================================ //

export default function Login() {
    const theme = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    async function Login (){
        const res = await userAPI.authenticateUser(email, password);
        if(!res.erro){
            console.log('user', res.usuario);
            localStorage.setItem('token', res.token);
            localStorage.setItem('userId', res.usuario.id);
            localStorage.setItem('userName', res.usuario.usuario);
            localStorage.setItem('userImage', res.usuario.foto);
            navigate('/');
        }
      }

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <div className="container">
                    <div className="container-login">
                        <div className="wrap-login">
                        <form className="login-form">
                        <div className="login-form-title">
                            <img className="logo-company" src={metaLogo}/>
                        </div>


                            <span className="login-form-title"> Bem vindo </span>

                            <div className="div-input">
                            <div className="wrap-input">
                                <input
                                className={email !== "" ? "has-val input" : "input"}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className="focus-input" data-placeholder="Email"></span>
                            </div>

                            <div className="wrap-input">
                                <input
                                className={password !== "" ? "has-val input" : "input"}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="focus-input" data-placeholder="Senha"></span>
                            </div>

                            <div className="container-login-form-btn">
                                <button onClick={Login} className="login-form-btn" type="button">Login</button>
                                <span className="txt1">Não possui conta? </span>
                                <a className="txt2" href="/register">
                                Criar conta
                                </a>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </Grid>
        </AuthWrapper1>
    );
};
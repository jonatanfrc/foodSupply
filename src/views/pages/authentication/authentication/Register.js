import React, { useState } from "react";
import "./style/register.css"

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, useMediaQuery } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import userAPI from "../../../../services/signin"

// project imports
import AuthWrapper1 from '../AuthWrapper1';

// ================================|| AUTH3 - LOGIN ||================================ //

const Register = () => {
    const theme = useTheme();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imageName, setImageName] = useState("");
    let navigate = useNavigate();

    function fileSelectedHandler(event){
        setImageName(event.target.files[0].name)
        console.log("event", event.target.files[0]);
    }

    async function RegisterUser() {
        if(email === "" || username === "" || password === ""){
          // showModal();
        } else{
          const result = await userAPI.registerUser(email, username, imageName, password);
          if(!result.erro){
            localStorage.setItem('token', result.token);
            navigate('/');
          }
        }
      }

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
            <div className="container">
                <div className="container-login">
                    <div className="wrap-login">
            
                    <form className="login-form">
            
                        <span className="login-form-title"> Crie sua conta </span>
            
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
                            className={username !== "" ? "has-val input" : "input"}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Nome de usuário"></span>
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
                        
                        <div className="wrap-input">
                            <input
                            className={password !== "" ? "has-val input" : "input"}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Confirme sua senha"></span>
                        </div>

                        <div className="wrap-input">
                            <input
                            className={password !== "" ? "has-val input" : "input"}
                            type="text"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="URL da imagem"></span>
                        </div>


                        {/* <div className="wrap-input">
                            <input type="file" onChange={fileSelectedHandler}></input>
                        </div> */}
            
                        <div className="container-login-form-btn">
                            <button type="button" onClick={RegisterUser} className="login-form-btn">Cadastrar</button>
                            <span className="txt1">Já possui conta? </span>
                            <a className="txt2" href="/login">
                            Faça login
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

export default Register;

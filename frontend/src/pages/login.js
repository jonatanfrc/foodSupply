import { useState } from "react";
import "../styles/login.css";
import metaLogo from "../assets/meta-logo.png"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
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
                <button className="login-form-btn">Login</button>
                <span className="txt1">Não possui conta? </span>
                <a className="txt2" href="/">
                  Criar conta
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import "../styles/login.css";
import { RollbackOutlined } from '@ant-design/icons';

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">

            {/* <button><RollbackOutlined /></button> */}

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
                  className={name !== "" ? "has-val input" : "input"}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Nome"></span>
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

              <div className="container-login-form-btn">
                <button className="login-form-btn">Cadastrar</button>
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
  );
}

export default Register;

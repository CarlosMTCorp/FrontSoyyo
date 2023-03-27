/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/registerView.module.css";
import styleForm from "../../styles/loginRegisterForms.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseUtils";
import { useNavigate } from "react-router-dom";
import {
  DOMAIN,
  ENDPOINT_LOGIN_REGISTER,
  ROUTER_INITIAL,
} from "../../config/Constant";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setMessage("Las Contraseñas no coinciden");
      }
    }
    return isValid;
  };

  const registerNewUser = async () => {
    try {
      setMessage("");
      if (validatePassword()) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        let idToken = await user.getIdToken(true);

        const response = await fetch(DOMAIN + ENDPOINT_LOGIN_REGISTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${idToken}`,
          },
        });
        await response.json().then((data) => {
          setMessage("Perfil creado correctamente.");
          history(ROUTER_INITIAL);
        });
      }
    } catch (e) {
      window.alert(e.code);
    }
  };

  return (
    <div className={style.registerView}>
      <div className={styleForm.auth}>
        <div className={styleForm.logo}>
          <img
            src={require("../../assets/Iconos/Logo soy yo blanco.png")}
            alt="logo soyyo"
            width="300px"
            height="75px"
          />
        </div>{" "}
        <div className={styleForm.form}>
          <div className={styleForm.password}>
            <input
              className={styleForm.inputs}
              type="email"
              value={email}
              placeholder="Ingresa tu correo electrónico"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>{" "}
          {message && <div className={style.error}>{message}</div>}
          <div className={styleForm.password}>
            <input
              className={styleForm.inputs}
              type="password"
              value={password}
              required
              placeholder="Ingresa tu contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styleForm.password}>
            <input
              className={styleForm.inputs}
              type="password"
              value={confirmPassword}
              required
              placeholder="Confirmar contraseña"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              registerNewUser();
            }}
          >
            Registrarse
          </button>
        </div>
        <div>
          <br />
          <h5>¿Ya tienes una cuenta?</h5>
          <Link className={style.contraseña} to={ROUTER_INITIAL}>
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

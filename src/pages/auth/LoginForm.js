/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/loginView.module.css";
import styleForm from "../../styles/loginRegisterForms.module.css";
import GoogleButton from "./SignInWithGoogle";
import { signInWithEmailAndPassword } from "firebase/auth";
import FacebookButton from "./SignInWithFacebook";

import { userLogin } from "../../redux/loginSlice";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/FirebaseUtils";
import {
  DOMAIN,
  ENDPOINT_LOGIN_REGISTER,
  ROUTER_HOME,
  ROUTER_REGISTER_FORM,
  ROUTER_RESET_PASSWORD_FORM,
  ROUTER_VERIFY_EMAIL,
} from "../../config/Constant";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const signInUser = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
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
        const token = idToken;
        if (data.detail === "Email not Verified") {
          return history(ROUTER_VERIFY_EMAIL);
        }
        dispatch(userLogin(token));
        return history(ROUTER_HOME);
      });
    } catch (e) {
      window.alert(e.code);
    }
  };

  return (
    <div className={style.loginView}>
      <div className={styleForm.auth}>
        <div className={styleForm.logo}>
          <img
            src={require("../../assets/Iconos/Logo soy yo blanco.png")}
            alt="logo soyyo"
            width="300px"
            height="75px"
          />
        </div>

        <div className={styleForm.form}>
          <div className={styleForm.email}>
            <div className={styleForm.iconCorreo}>
              <img
                src={require("../../assets/Iconos/icon correo.png")}
                alt="icono correo"
              />
            </div>
            <input
              type="email"
              value={email}
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styleForm.password}>
            <div className={styleForm.iconCandado}>
              <img
                src={require("../../assets/Iconos/icon candado.png")}
                alt="icono contraseña"
              />
            </div>
            <input
              type="password"
              value={password}
              required
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              signInUser();
            }}
          >
            Iniciar Sesión
          </button>
        </div>

        <div className={style.linkContraseña}>
          <Link className={style.contraseña2} to={ROUTER_RESET_PASSWORD_FORM}>
            ¿Olvidaste tu Contraseña?
          </Link>
        </div>

        <div className={style.google}>
          <h5>Entrar con</h5>
          <FacebookButton style={style.provider} callback={setToken} />
          <GoogleButton style={style.provider} callback={setToken} />
        </div>

        <div>
          <h5>¿Aún no tienes una cuenta? </h5>
          <Link className={style.contraseña} to={ROUTER_REGISTER_FORM}>
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

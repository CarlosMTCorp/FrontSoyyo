import style from "../../styles/loginView.module.css";
import styleForm from "../../styles/loginRegisterForms.module.css";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { auth } from "../../firebase/FirebaseUtils";
import { sendEmailVerification } from "firebase/auth";
import { ROUTER_INITIAL } from "../../config/Constant";
import ModalAlert from "../../components/Modals/ModalAlert";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (userFirebase) {
      if (userFirebase) {
        setEmail(userFirebase.email);
        setUser(userFirebase);
      }
    });
  });

  const sendEmail = () => {
    if (user) {
      setShowModal(true);
      sendEmailVerification(user);
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
        <ModalAlert
          showModal={showModal}
          title={"Listo! Revisa tu correo."}
          body={
            "Por favor revisa tu buzon de correo y sigue las instrucciones enviadas. El correo fue enviado a:"
          }
          dynamicData={email}
          textButton={"Listo"}
          onHide={() => {
            setShowModal(false);
          }}
        />
        <div className={styleForm.form}>
          <h1>Verificar tu correo electronico</h1>
          <button
            className={styleForm.buttonForm}
            onClick={() => {
              sendEmail();
            }}
          >
            Enviar mensaje de verificación
          </button>
          <Link className={style.contraseña_verify} to={ROUTER_INITIAL}>
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

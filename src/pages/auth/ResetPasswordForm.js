/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/registerView.module.css";
import styleForm from "../../styles/loginRegisterForms.module.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/FirebaseUtils";
import { ROUTER_INITIAL } from "../../config/Constant";
import ModalAlert from "../../components/Modals/ModalAlert";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = () => {
    let isValid = true;
    if (email === "") {
      isValid = false;
      setMessage("Llene todos los campos.");
    }
    return isValid;
  };

  const sendEmailResetPassword = async () => {
    if (validateEmail()) {
      sendPasswordResetEmail(auth, email);
      setShowModal(true);
      setMessage("");
    }
  };

  return (
    <div className={style.registerView}>
      <div className={styleForm.auth}>
        <h1 className={styleForm.titulo}>Cambiar contraseña</h1>
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
          <div className={styleForm.password}>
            <input
              className={styleForm.inputs}
              type="email"
              value={email}
              placeholder="Ingresa tu correo electrónico"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {message && <div className={style.error}>{message}</div>}
          <button
            onClick={() => {
              sendEmailResetPassword();
            }}
          >
            Enviar
          </button>
        </div>

        <div>
          <br />
          <Link className={style.contraseña} to={ROUTER_INITIAL}>
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

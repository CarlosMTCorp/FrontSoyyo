import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DOMAIN } from "../../config/Constant";
import style from "../../styles/editProfile2View.module.css";
import Loading from "../Loading";

const Email = ({ handleOnHide }) => {
  const [loadingActive, setLoadingActive] = useState(false);
  const [visible, setVisible] = useState(
    require("../../assets/Iconos/icon ojo a.png")
  );
  const [booleanBoton, setBoleanBoton] = useState(true);
  const token = useSelector((state) => state.login.token);

  const [emailDestino, setEmailDestino] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [email, setEmail] = useState({});

  const updateVisible = () => {
    if (booleanBoton) setVisible(require("../../assets/Iconos/icon ojo c.png"));
    else setVisible(require("../../assets/Iconos/icon ojo a.png"));
    setBoleanBoton(!booleanBoton);
  };

  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = async () => {
    const response = await fetch(DOMAIN + "profile/email", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((response) => {
      if (response.success === true) {
        setEmailDestino(response.data.email);
        setSubject(response.data.subject);
        setBody(response.data.body);
        setBoleanBoton(response.data.is_visible);
        setEmail(response.data);
      }
    });
  };

  const updateEmail = async () => {
    setLoadingActive(true);
    email.email = emailDestino;
    email.subject = subject;
    email.body = body;
    email.is_visible = booleanBoton;
    const response = await fetch(DOMAIN + "profile/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        email: emailDestino,
        subject: subject,
        body: body,
        is_visible: booleanBoton,
      }),
    });
    await response.json().then((data) => {

      setLoadingActive(false);
      handleOnHide();
    });
  };

  return (
    <div>
      {loadingActive ? (
        <Loading />
      ) : (
        <div className={style.container_email}>
          <div className={style.email_item}>
            <label> Dirección de tu correo electronico: </label>
            <input
              className={style.email_item}
              type="text"
              placeholder="example@dominio.extensión"
              value={emailDestino}
              onChange={(e) => setEmailDestino(e.target.value)}
            ></input>
          </div>
          <div className={style.email_item}>
            <label> Asunto: </label>
            <input
              type="text"
              placeholder="escriba el asunto del correo"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            ></input>
          </div>
          <div className={style.email_item}>
            <label>Cuerpo: </label>
            <input
              type="text"
              placeholder="escriba asunto del correo"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></input>
          </div>
          <div className={style.button_email}>
            <img src={visible} onClick={updateVisible} alt="" />
            <button
              className={style.btn_primary}
              onClick={() => {
                updateEmail();
              }}
            >
              Guardar datos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Email;

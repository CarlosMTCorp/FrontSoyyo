import React, { useState } from "react";
import style from "../../styles/modals.module.css";
import Informacion from "../home/Informacion";
import ModalGeneric from "./ModalGeneric";

const ModalGenericSocialMedia = (props) => {
  const [showInformación, setShowInformacion] = useState(false);

  if (showInformación === true) {
    return (
      <div className={style.overlay}>
        <div className={style.container_modal}>
          <div className={style.modal_header}>
            <div className={style.info}>
              <img
                src={require("../../assets/Iconos/icon informacion.png")}
                alt=""
                onClick={() => {
                  setShowInformacion(true);
                }}
              />
              <ModalGeneric
                title="Guía para encontrar tu Nombre de Usuario"
                show={showInformación}
                onHide={() => setShowInformacion(false)}
                children={<Informacion tipo={props.tipo} />}
              />
            </div>

            <h4> {props.title}</h4>
            <button className={style.btn_hide} onClick={props.onHide} hidden>
              <img src={require("../../assets/Iconos/icon X.png")} alt="" />
            </button>
          </div>
          <div className={style.modal_body}>{props.children}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!props.show ? null : (
        <div className={style.overlay}>
          <div className={style.container_modal}>
            <div className={style.modal_header}>
              <div className={style.info}>
                <img
                  src={require("../../assets/Iconos/icon informacion.png")}
                  alt=""
                  onClick={() => {
                    setShowInformacion(true);
                  }}
                />
                <ModalGeneric
                  title="Guía para encontrar tu Nombre de Usuario"
                  show={showInformación}
                  onHide={() => setShowInformacion(false)}
                  children={<Informacion tipo={props.tipo} />}
                />
              </div>

              <h4> {props.title}</h4>
              <button className={style.btn_hide} onClick={props.onHide}>
                <img src={require("../../assets/Iconos/icon X.png")} alt="" />
              </button>
            </div>
            <div className={style.modal_body}>{props.children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalGenericSocialMedia;

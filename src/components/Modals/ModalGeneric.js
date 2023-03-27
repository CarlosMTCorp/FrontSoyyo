import React from "react";
import style from "../../styles/modals.module.css";

const ModalGeneric = (props) => {
  return (
    <>
      {!props.show ? null : (
        <div className={style.overlay}>
          <div className={style.container_modal}>
            <div className={style.modal_header}>
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

export default ModalGeneric;

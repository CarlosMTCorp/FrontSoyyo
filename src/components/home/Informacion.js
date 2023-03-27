/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */

import React from "react";
import style from "../../styles/editProfile2View.module.css";

const Informacion = (props) => {
  const linkedin = require("../../assets/modals/linkedin.png");
  const facebook = require("../../assets/modals/facebook.png");
  const instagram = require("../../assets/modals/instagram.png");
  const tiktok = require("../../assets/modals/tiktok.png");
  const twitter = require("../../assets/modals/twitter.png");
  const twitch = require("../../assets/modals/twitch.png");

  function modalTipo() {
    if (props.tipo === "LinkedIn") {
      return linkedin;
    }
    if (props.tipo === "Facebook") {
      return facebook;
    }
    if (props.tipo === "Instagram") {
      return instagram;
    }
    if (props.tipo === "Tiktok") {
      return tiktok;
    }
    if (props.tipo === "Twitter") {
      return twitter;
    }
    if (props.tipo === "Twitch") {
      return twitch;
    }
  }
  return (
    <div className={style.cont_informacion}>
      <img src={modalTipo()} />
    </div>
  );
};

export default Informacion;

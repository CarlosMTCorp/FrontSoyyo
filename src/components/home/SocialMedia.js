import React, { useState } from "react";
import style from "../../styles/editProfile2View.module.css";
import Loading from "../Loading";

const SocialMedia = ({ id, setSocialProfile, index, infoSocial }) => {
  const [loadingActive, setLoadingActive] = useState(false);
  const [visible, setVisible] = useState(
    infoSocial == null
      ? require("../../assets/Iconos/icon ojo a.png")
      : infoSocial.is_visible
      ? require("../../assets/Iconos/icon ojo a.png")
      : require("../../assets/Iconos/icon ojo c.png")
  );
  const [infoSocialMedia, setInfoSocialMedia] = useState({
    social_media_id: id,
    url_complete: infoSocial?.url_complete,
    is_visible:
      infoSocial != null || infoSocial != undefined
        ? infoSocial.is_visible
        : true,
  });

  const updateVisible = () => {
    if (infoSocialMedia.is_visible)
      setVisible(require("../../assets/Iconos/icon ojo c.png"));
    else setVisible(require("../../assets/Iconos/icon ojo a.png"));
    setInfoSocialMedia({
      ...infoSocialMedia,
      is_visible: !infoSocialMedia.is_visible,
    });
  };

  const handleChange = (event) => {
    setInfoSocialMedia({
      ...infoSocialMedia,
      url_complete: event.target.value,
    });
  };

  const setSocialMedia = () => {
    setSocialProfile({ ...infoSocialMedia }, index);
    setLoadingActive(true);
  };

  return (
    <div>
      {loadingActive ? (
        <Loading />
      ) : (
        <div className={style.cont_whatsapp}>
          <div className={style.socialMedia_item}>
            <label> Nombre de Usuario: </label>
            <input
              className=""
              type="text"
              placeholder="Escribe tu nombre de Usuario"
              onChange={handleChange}
              value={infoSocialMedia.url_complete}
            />
          </div>
          <div className={style.socialMedia_item_btn}>
            <img src={visible} onClick={updateVisible} alt="" />
            <button className={style.btn_primary} onClick={setSocialMedia}>
              Guardar Datos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMedia;

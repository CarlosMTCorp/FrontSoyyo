/* eslint-disable no-unused-expressions */
import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DOMAIN } from "../../config/Constant";
import style from "../../styles/editProfile2View.module.css";
import Loading from "../Loading";

const PersonalLink = ({ link, handleOnHide }) => {
  const token = useSelector((state) => state.login.token);
  const [loadingActive, setLoadingActive] = useState(false);

  const [website, setWebsite] = useState("");
  const [urlWebsite, setUrlWebsite] = useState("");
  const [personalLink, setPersonalLink] = useState({});

  const [imageView, setImageView] = useState(
    require("../../assets/Iconos/undefined.png")
  );
  const [imageForm, setImageForm] = useState(null);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(
    require("../../assets/Iconos/icon ojo a.png")
  );
  const [booleanBoton, setBoleanBoton] = useState(true);
  const fileRef = useRef(null);

  useEffect(() => {
    if (link === null) {
    } else {
      setUrlWebsite(link.url);
      setWebsite(link.title);
    }
  }, []);

  const updateVisible = () => {
    if (booleanBoton) setVisible(require("../../assets/Iconos/icon ojo c.png"));
    else setVisible(require("../../assets/Iconos/icon ojo a.png"));
    setBoleanBoton(!booleanBoton);
  };

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }
  const handleChangeFile = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = async function () {
        setImageView(reader.result);
      };
      setImageForm(files[0]);
      reader.readAsDataURL(files[0]);
    }
  };

  const sendPhoto = async (id) => {
    if (imageForm === null) {
      setLoadingActive(false);
      handleOnHide();
      return;
    }
    const url = DOMAIN + "profile/custom_social_media/" + id;
    const data = new FormData();
    data.append("image", imageForm);
    axios
      .put(url, data, {
        headers: {
          Authorization: "JWT " + token,
        },
      })
      .then((res) => {
        setWebsite("");
        setUrlWebsite("");
        handleOnHide();
      })
      .catch((error) => {});
  };

  const updatePersonalLink = async (link) => {
    setLoadingActive(true);
    if (link === null) {
      personalLink.title = website;
      personalLink.url = "https://" + urlWebsite.replace("https://", "");
      personalLink.is_visible = booleanBoton;
      const response = await fetch(DOMAIN + "profile/custom_social_media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(personalLink),
      });
      await response.json().then((data) => {
        sendPhoto(data.data.id);
      });
    } else {
      const response = await fetch(
        DOMAIN + "profile/custom_social_media/" + link.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({
            title: website,
            url: urlWebsite,
            is_visible: booleanBoton,
          }),
        }
      );
      await response.json().then((data) => {
        if (data.data === undefined) {
          handleOnHide();
        } else {
          sendPhoto(data.data.id);
        }
      });
    }
  };

  return (
    <div>
      {loadingActive ? (
        <Loading />
      ) : (
        <div className={style.cont_personalLink}>
          <div className={style.personalLink_item}>
            <input
              className=""
              type="text"
              placeholder="Nombre del Sitio Web"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className={style.personalLink_item}>
            <input
              className=""
              type="text"
              placeholder="URL del Sitio Web"
              value={urlWebsite}
              onChange={(e) => setUrlWebsite(e.target.value)}
            />
          </div>

          <div className={style.personalLink_item_progress}>
            <button className={style.btn_file} onClick={handleOpenFilePicker}>
              Seleccionar Archivo
            </button>
            <input
              accept="image/x-png,image/jpeg"
              ref={fileRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
            <ProgressBar
              className={style.file}
              striped
              variant="success"
              animated
              now={progress}
              label={`${progress}%`}
            />
          </div>
          <div className={style.personalLink_item}>
            <img src={visible} onClick={updateVisible} alt="" />
            <button
              className={style.btn_primary}
              onClick={() => {
                updatePersonalLink(link);
              }}
            >
              Agregar Nuevo Enlace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalLink;

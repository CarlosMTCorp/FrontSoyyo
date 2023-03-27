import axios from "axios";
import React, { useRef } from "react";
// import AvatarEditor from 'react-avatar-edit';
import { useState } from "react";
import { useSelector } from "react-redux";
import { DOMAIN } from "../../config/Constant";
import style from "../../styles/editProfile2View.module.css";
import Loading from "../Loading";
import imageCompression from "browser-image-compression";

export default function AddPhoto({ handleOnHide }) {
  const token = useSelector((state) => state.login.token);
  const fileRef = useRef(null);
  const [imageView, setImageView] = useState(
    require("../../assets/Iconos/icon cloud.png")
  );
  // const [image, setImage] = useState(null);
  const [loadingActive, setLoadingActive] = useState(false);
  const [imageForm, setImageForm] = useState(null);

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }
  const sendPhoto = async () => {
    setLoadingActive(true);
    if (imageForm === null) {
      setLoadingActive(false);
      return;
    }
    const url = DOMAIN + "profile/user";
    const data = new FormData();
    data.append("image", imageForm);
    axios
      .put(url, data, {
        headers: {
          Authorization: "JWT " + token,
        },
      })
      .then((res) => {
        handleOnHide();
      })
      .catch((error) => {});
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const files = event.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = async function () {
        setImageView(reader.result);
        // setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }

    const imageBlob = files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/jpeg",
    };
    try {
      const compressedBlob = await imageCompression(imageBlob, options);
      let compressedFile = new File([compressedBlob], compressedBlob.name);
      setImageForm(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      {loadingActive ? (
        <Loading />
      ) : (
        <div className={style.container_addPhoto}>
          <div className={style.img_cloud}>
            <img src={imageView} alt="" onClick={handleOpenFilePicker} />
          </div>
            {/* <AvatarEditor
          width={350}
          height={350}
          onCrop={handleImageUpload}
          onClose={() => setImage(null)}
          src={image}
          /> */}
          <div className={style.btns_addPhoto}>
            <button
              className={style.btn_primary}
              onClick={handleOpenFilePicker}
            >
              Subir
            </button>
            <input
              accept="image/x-png,image/jpeg"
              ref={fileRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <button className={style.btn_primary} onClick={sendPhoto}>
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DOMAIN } from "../../config/Constant";
import styles from "../../styles/background.module.css";
import imageCompression from "browser-image-compression";
import Loading from "../../components/Loading";
import { changeBackground } from "../perfil/changeBackground";
////////
/*importados para slider de backgrounds*/
import style from "../../styles/editProfile2View.module.css";
// import styleEditProf from "../../styles/editProfile2View.module.css";
// import { useDraggable } from "react-use-draggable-scroll";


/*importar carrusel*/
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Background = ({ setFondo }) => {
  /*se añadio para pruebas*/
  // const ref = useRef();
  // const { events } = useDraggable(ref);
  /**/

  const imgRef = useRef(null);
  const token = useSelector((state) => state.login.token);
  const [imageForm, setImageForm] = useState(null);
  const [loadingActive, setLoadingActive] = useState(false);
  const fileRef = useRef(null);

  const sendPhoto = async () => {
    setLoadingActive(true);
    const url = DOMAIN + "profile/user";
    const data = new FormData();
    data.append("background", imageForm);
    axios
      .put(url, data, {
        headers: {
          Authorization: "JWT " + token,
        },
      })
      .then((res) => {
        setLoadingActive(false);
      })
      .catch((error) => {});
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const files = event.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = async function () {};
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
      setFondo(compressedFile);
      changeBackground(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  function convertirImagen(nombre) {
    try {
      const img = document.getElementById(nombre);
      fetch(img.src)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], nombre + ".jpg", blob);
          setImageForm(file);
          setFondo(file);
          changeBackground(file);
        });
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <>
      {loadingActive ? (
        <Loading />
      ) : (
        <>

          <Carousel>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("amarillo")}>
              <img
                id={"amarillo"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - amarillo.jpg")}
                onClick={() => convertirImagen("amarillo")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("azul")}>
              <img
                id={"azul"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - azul2.jpg")}
                onClick={() => convertirImagen("azul")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("beige")}>
              <img
                id={"beige"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - beige2.jpg")}
                onClick={() => convertirImagen("beige")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("gris-negro")}>
              <img
                id={"gris-negro"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - gris negro.jpg")}
                onClick={() => convertirImagen("gris-negro")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("gris")}>
              <img
                id={"gris"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - gris2.jpg")}
                onClick={() => convertirImagen("gris")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("morado")}>
              <img
                id={"morado"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - moradoai3.jpg")}
                onClick={() => convertirImagen("morado")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("narajna")}>
              <img
                id={"narajna"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - naranja.jpg")}
                onClick={() => convertirImagen("narajna")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("rojo")}>
              <img
                id={"rojo"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - rojo3.jpg")}
                onClick={() => convertirImagen("rojo")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("rosado")}>
              <img
                id={"rosado"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - rosado.jpg")}
                onClick={() => convertirImagen("rosado")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("verde")}>
              <img
                id={"verde"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - verde2.jpg")}
                onClick={() => convertirImagen("verde")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond1")}>
              <img
                id={"fond1"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond1.jpg")}
                onClick={() => convertirImagen("fond1")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond2")}>
              <img
                id={"fond2"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond2.jpg")}
                onClick={() => convertirImagen("fond2")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond3")}>
              <img
                id={"fond3"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond3.jpg")}
                onClick={() => convertirImagen("fond3")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond4")}>
              <img
                id={"fond4"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond4.jpg")}
                onClick={() => convertirImagen("fond4")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond5")}>
              <img
                id={"fond5"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond5.jpg")}
                onClick={() => convertirImagen("fond5")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond6")}>
              <img
                id={"fond6"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond6.jpg")}
                onClick={() => convertirImagen("fond6")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond7")}>
              <img
                id={"fond7"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond7.jpg")}
                onClick={() => convertirImagen("fond7")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond8")}>
              <img
                id={"fond8"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond8.jpg")}
                onClick={() => convertirImagen("fond8")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond9")}>
              <img
                id={"fond9"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond9.jpg")}
                onClick={() => convertirImagen("fond9")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond10")}>
              <img
                id={"fond10"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond10.jpg")}
                onClick={() => convertirImagen("fond10")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond11")}>
              <img
                id={"fond11"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond11.jpg")}
                onClick={() => convertirImagen("fond11")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond12")}>
              <img
                id={"fond12"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond12.jpg")}
                onClick={() => convertirImagen("fond12")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond13")}>
              <img
                id={"fond13"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond13.jpg")}
                onClick={() => convertirImagen("fond13")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond14")}>
              <img
                id={"fond14"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond14.jpg")}
                onClick={() => convertirImagen("fond14")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond15")}>
              <img
                id={"fond15"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond15.jpg")}
                onClick={() => convertirImagen("fond15")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond16")}>
              <img
                id={"fond16"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond16.jpg")}
                onClick={() => convertirImagen("fond16")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond17")}>
              <img
                id={"fond17"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond17.jpg")}
                onClick={() => convertirImagen("fond17")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef} onClick={() => convertirImagen("fond18")}>
              <img
                id={"fond18"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/fond18.jpg")}
                onClick={() => convertirImagen("fond18")}
              />
            </div>


          </Carousel>
          <div className={styles.container_background}>
            {/* <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"amarillo"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - amarillo.jpg")}
                onClick={() => convertirImagen("amarillo")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"azul"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - azul2.jpg")}
                onClick={() => convertirImagen("azul")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"beige"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - beige2.jpg")}
                onClick={() => convertirImagen("beige")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"gris-negro"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - gris negro.jpg")}
                onClick={() => convertirImagen("gris-negro")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"gris"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - gris2.jpg")}
                onClick={() => convertirImagen("gris")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"morado"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - moradoai3.jpg")}
                onClick={() => convertirImagen("morado")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"narajna"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - naranja.jpg")}
                onClick={() => convertirImagen("narajna")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"rojo"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - rojo3.jpg")}
                onClick={() => convertirImagen("rojo")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"rosado"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - rosado.jpg")}
                onClick={() => convertirImagen("rosado")}
              />
            </div>
            <div className={styles.backgrounds} ref={imgRef}>
              <img
                id={"verde"}
                className={styles.imagen_background}
                src={require("../../assets/backgrounds/Poligonos - verde2.jpg")}
                onClick={() => convertirImagen("verde")}
              />
            </div> */}
            {/* <div className={styles.backgrounds}>
              <img
                className={styles.imagen_background}
                src={require("../../assets/Iconos/icon añadir.png")}
                onClick={handleOpenFilePicker}
              />
              <input
                accept="image/x-png,image/jpeg"
                ref={fileRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
            <div className={styles.backgrounds}>
              <img
                className={styles.imagen_background}
                src={require("../../assets/Iconos/icon check.png")}
                onClick={sendPhoto}
              />
            </div> */}
          </div>
            <div className={style.container_button} >
              <div className={styles.backgrounds} heigth='50px' >
                <img
                  src={require("../../assets/Iconos/icon añadir.png")}
                  onClick={handleOpenFilePicker}
                />
                <input
                  accept="image/x-png,image/jpeg"
                  ref={fileRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
              <div className={styles.backgrounds}>
                <img
                  src={require("../../assets/Iconos/icon check.png")}
                  onClick={sendPhoto}
                />
              </div>
            </div>
          

        </>
      )}
    </>
  );
};

export default Background;

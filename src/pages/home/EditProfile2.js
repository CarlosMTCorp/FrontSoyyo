import React, { useState, useRef, useEffect } from "react";
import ModalGeneric from "../../components/Modals/ModalGeneric";

import Whatsapp from "../../components/home/Whatsapp";
import Email from "../../components/home/Email";
import { imageSocialMedia } from "../../utils/mockimages";

import styleEditProf from "../../styles/editProfile2View.module.css";
import SocialMedia from "../../components/home/SocialMedia";
import ModalGenericSocialMedia from "../../components/Modals/ModalGenericSocialMedia";
import PersonalLink from "../../components/home/PersonalLink";
import { RiPencilFill } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { useDraggable } from "react-use-draggable-scroll";
import Call from "../../components/home/Call";
import { DOMAIN, IMAGE_DOMAIN } from "../../config/Constant";
import { useSelector } from "react-redux";
import AddPhoto from "../../components/home/AddPhoto";
import AddPhoto2 from "../../components/home/AddPhoto2";
import Loading from "../../components/Loading";
import MapSoyYo from "../../components/maps/googleMap";
import Design from "./Design";
import PublicProfileView from "../perfil/publicProfileView";
import Background from "./Background";

const EditProfile2 = () => {
  const ref = useRef();
  const token = useSelector((state) => state.login.token);
  const { events } = useDraggable(ref);

  const [showAddLink, setShowAddLink] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showPersonalLink, setShowPersonalLink] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [image, setImage] = useState("");
  const [stateName, setStateName] = useState(true);
  const [stateCareer, setStateCareer] = useState(true);
  const [profile, setProfile] = useState({});
  const [dataSocialMedia, setDataSocialMedia] = useState([]);
  const [dataSocialMediaUser, setDataSocialMediaUser] = useState([]);
  const [loadingActive, setLoadingActive] = useState(false);
  const [personalLink, setPersonalLink] = useState([]);
  const [infoSocial, setInfoSocial] = useState([]);
  const [link, setLink] = useState({});
  const [user, setUser] = useState({});

  const [color, setColor] = useState("");
  const [fondo, setFondo] = useState("");

  useEffect(() => {
    setLoadingActive(true);
    getSocialProfile();
    getUser();
    getProfile();
    getPersonalLink();
    getSocialProfileUser();
  }, []);

  const getUser = async () => {
    const response = await fetch(DOMAIN + "auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((data) => {
      setUser(data);
      getProfile();
    });
  };

  const getSocialProfile = async () => {
    const response = await fetch(DOMAIN + "profile/base_social_media", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((data) => {
      data.map((item) => {
        item.show = false;
      });
      setDataSocialMedia(data);
    });
  };

  const setSocialProfile = async (newInfo, index) => {
    const response = await fetch(DOMAIN + "profile/social_media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(newInfo),
    });
    await response.json().then(async (data) => {
      await getSocialProfileUser();
      showModal(index);
    });
  };

  const getSocialProfileUser = async () => {
    const response = await fetch(DOMAIN + "profile/social_media", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((data) => {
      setDataSocialMediaUser(data.data);
    });
  };

  const getInfoSocial = (id) => {
    const aux = dataSocialMediaUser.filter(
      (item) => item.social_media.id === id
    );
    if (aux[0] == null) setInfoSocial(null);
    else setInfoSocial(aux[0]);
  };

  const showModal = (index) => {
    let info = [...dataSocialMedia];
    info[index].show = !info[index].show;
    setDataSocialMedia(info);
  };

  const getProfile = async () => {
    const response = await fetch(DOMAIN + "profile/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((response) => {
      if (response.success === true) {
        setName(response.data.public_name);
        setCareer(response.data.career);
        setImage(response.data.image);
        setProfile(response.data);
        setColor(response.data.color);
        setFondo(response.data.background);
        setLoadingActive(false);
      }
    });
  };

  const updateProfile = async (setState) => {
    setState(true);
    profile.public_name = name;
    profile.career = career;
    const response = await fetch(DOMAIN + "profile/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ public_name: name, career: career }),
    });
    await response.json().then((data) => {});
  };

  const getPersonalLink = async () => {
    const response = await fetch(DOMAIN + "profile/custom_social_media", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((response) => {
      if (response.success === true) {
        setPersonalLink(response.data);
      }
    });
  };

  const updatePersonalLink = (link) => {
    setShowPersonalLink(true);
    setLink(link);
  };

  function onHideModal() {
    setShowAddLink(false);
    getProfile();
  }

  function onHideModalLink() {
    setShowPersonalLink(false);
    setShowCall(false);
    setShowWhatsapp(false);
    setShowEmail(false);
    setShowMap(false);
    getPersonalLink();
  }

  return (
    <>
      {loadingActive ? (
        <Loading />
      ) : (
        <div className={styleEditProf.container_profile2}>
          <div className={styleEditProf.container_items}>
            <div
              className={styleEditProf.profile_circle}
              onClick={() => setShowAddLink(true)}
            >
              <img src={IMAGE_DOMAIN + image} alt="Imagen de perfil" />
            </div>
            <ModalGeneric
              title="Añadir foto de perfil"
              show={showAddLink}
              onHide={() => onHideModal()}
              children={<AddPhoto handleOnHide={onHideModal} />}
            />
            <div className={styleEditProf.inputsPerfil}>
              <div className={styleEditProf.edit_profile_item}>
                {stateName ? (
                  <>
                    {" "}
                    <div className={styleEditProf.container_input2}>
                      <button
                        className={styleEditProf.btn_custom_p}
                        onClick={() => setStateName(false)}
                      >
                        <RiPencilFill></RiPencilFill>
                      </button>
                      <h4>{name === "" ? "Nombre Público" : name}</h4>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className={styleEditProf.container_btn_check}>
                      <input
                        type="name"
                        value={name}
                        required
                        placeholder="Nombre Público"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <button
                        className={styleEditProf.btn_custom_check}
                        onClick={() => {
                          setStateName(true);
                          setName(profile.public_name);
                        }}
                      >
                        <IoIosClose> </IoIosClose>
                      </button>
                      <button
                        className={styleEditProf.btn_custom_check}
                        onClick={() => {
                          updateProfile(setStateName);
                        }}
                      >
                        <BiCheck> </BiCheck>
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className={styleEditProf.edit_profile_item}>
                {stateCareer ? (
                  <>
                    {" "}
                    <div className={styleEditProf.container_input2}>
                      <button
                        className={styleEditProf.btn_custom_p}
                        onClick={() => setStateCareer(false)}
                      >
                        <RiPencilFill></RiPencilFill>
                      </button>
                      <h4>{career === "" ? "Profesión" : career}</h4>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className={styleEditProf.container_btn_check2}>
                      <input
                        type="career"
                        value={career}
                        required
                        placeholder="Profesión"
                        onChange={(e) => setCareer(e.target.value)}
                      />
                      <button
                        className={styleEditProf.btn_custom_check}
                        onClick={() => {
                          setStateCareer(true);
                          setCareer(profile.career);
                        }}
                      >
                        <IoIosClose> </IoIosClose>
                      </button>
                      <button
                        className={styleEditProf.btn_custom_check}
                        onClick={() => {
                          updateProfile(setStateCareer);
                        }}
                      >
                        <BiCheck> </BiCheck>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styleEditProf.edit_profile_item}>
              <div
                className={styleEditProf.edit_profile_icons}
                {...events}
                ref={ref}
              >
                <div className={styleEditProf.edit_profile_icons_item}>
                  <button
                    className={styleEditProf.btn_custom}
                    onClick={() => {
                      setShowPersonalLink(true);
                      setLink(null);
                    }}
                  >
                    <div className=""> </div>
                    <img
                      alt=""
                      src={require("../../assets/Iconos/icon añadir.png")}
                    />
                    <p> Añadir links </p>
                  </button>
                  <ModalGeneric
                    title="Datos para los Enlaces Personales"
                    show={showPersonalLink}
                    onHide={() => onHideModalLink()}
                    children={
                      <PersonalLink
                        link={link}
                        handleOnHide={onHideModalLink}
                      />
                    }
                  />
                </div>
                <div className={styleEditProf.edit_profile_icons_item}>
                  <button
                    className={styleEditProf.btn_custom}
                    onClick={() => setShowWhatsapp(true)}
                  >
                    <div className=""></div>
                    <img
                      alt=""
                      src={require("../../assets/Iconos/icon whatsapp.png")}
                    />
                    <p> WhatsApp </p>
                  </button>
                  <ModalGeneric
                    title="Datos para el enlace de tu Whatsapp"
                    show={showWhatsapp}
                    onHide={() => onHideModalLink()}
                    children={<Whatsapp handleOnHide={onHideModalLink} />}
                  />
                </div>
                <div className={styleEditProf.edit_profile_icons_item}>
                  <button
                    className={styleEditProf.btn_custom}
                    onClick={() => {
                      setShowCall(true);
                    }}
                  >
                    <div className=""> </div>
                    <img
                      alt=""
                      src={require("../../assets/Iconos/icon telefono.png")}
                    />
                    <p> Llamar </p>
                  </button>
                  <ModalGeneric
                    title="Datos para el enlace de tu Telefóno de Contacto"
                    show={showCall}
                    onHide={() => onHideModalLink()}
                    children={<Call handleOnHide={onHideModalLink} />}
                  />
                </div>
                <div className={styleEditProf.edit_profile_icons_item}>
                  <button
                    className={styleEditProf.btn_custom}
                    onClick={() => {
                      setShowEmail(true);
                    }}
                  >
                    <div className=""> </div>
                    <img
                      alt=""
                      src={require("../../assets/Iconos/icon correo.png")}
                    />
                    <p> E-mail </p>
                  </button>
                  <ModalGeneric
                    title="Datos para el enlace de tu E-mail"
                    show={showEmail}
                    onHide={() => onHideModalLink()}
                    children={<Email handleOnHide={onHideModalLink} />}
                  />
                </div>
                <div className={styleEditProf.edit_profile_icons_item}>
                  <button
                    className={styleEditProf.btn_custom}
                    onClick={() => {
                      setShowMap(true);
                    }}
                  >
                    <div className=""> </div>
                    <img
                      alt=""
                      src={require("../../assets/Iconos/icon ubicacion.png")}
                    />
                    <p> Mapa </p>
                  </button>
                  <ModalGeneric
                    title="Datos para el enlace de tu ubicación"
                    show={showMap}
                    onHide={() => onHideModalLink()}
                    children={<MapSoyYo handleOnHide={onHideModalLink} />}
                  />
                </div>

                {dataSocialMedia.map((socialMedia, index) => (
                  <div
                    key={socialMedia.id + socialMedia.title}
                    className={styleEditProf.edit_profile_icons_item}
                  >
                    <button
                      className={styleEditProf.btn_custom}
                      onClick={() => {
                        getInfoSocial(socialMedia.id);
                        showModal(index);
                      }}
                    >
                      <div className=""> </div>
                      <img alt="" src={imageSocialMedia(socialMedia.id)} />
                      <p> {socialMedia.title} </p>
                    </button>
                    <ModalGenericSocialMedia
                      title={`Datos de tu Usuario de ${socialMedia.title}`}
                      show={socialMedia.show}
                      onHide={() => showModal(index)}
                      children={
                        <SocialMedia
                          id={socialMedia.id}
                          setSocialProfile={setSocialProfile}
                          index={index}
                          infoSocial={infoSocial}
                        />
                      }
                      tipo={socialMedia.title}
                    />
                  </div>
                ))}
                {personalLink.map((item) => (
                  <div
                    key={item.id + item.title}
                    className={styleEditProf.edit_profile_icons_items}
                  >
                    <button
                      className={styleEditProf.btn_custom}
                      onClick={() => {
                        updatePersonalLink(item);
                      }}
                    >
                      <div className=""> </div>
                      <img alt="" src={IMAGE_DOMAIN + item?.image} />
                      <p>{`${item.title}`}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styleEditProf.container_items}>
            <PublicProfileView user={user} color={color} fondo={fondo} />
            <div className="padding-top: 10px">
              <Design setColor={setColor} />
            </div>
            
          </div>
          {/* <div className={styleEditProf.container_items}>
            <Design setColor={setColor} />
          </div> */}
          <div className={styleEditProf.container_items}>
            
            <Background setFondo={setFondo} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile2;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import style from "../../styles/publicProfileView.module.css";
import { Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import Contact from "../../components/perfil/contact";
import { imageSocialMedia } from "../../utils/mockimages";
import Loading from "../../components/Loading";

const PublicProfileView = ({ user, color }) => {
  const ref = useRef();
  const { events } = useDraggable(ref);
  const [loadingActive, setLoadingActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [whatsapp, setWhatsapp] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({});
  const [email, setEmail] = useState({});
  const [mapa, setMapa] = useState({});
  const [url, setUrl] = useState("");
  const [personalLink, setPersonalLink] = useState([]);
  const [dataSocialMedia, setDataSocialMedia] = useState([]);

  const [fondo, setFondo] = useState("");

  useEffect(() => {
    setLoadingActive(true);
    getProfile();
  }, []);

  const getProfile = async () => {
    const response = await fetch(
      "https://api.soyyo.digital/soy-yo/user/" + user.public_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await response.json().then((response) => {
      setTimeout(() => {
        if (response.success === true) {
          setProfile(response.data);
          setWhatsapp(response.data.whatsapp);
          setPhoneNumber(response.data.phone);
          setEmail(response.data.email);
          setMapa(response.data.map);
          setPersonalLink(response.data.custom_social_media);
          setDataSocialMedia(response.data.social_media);
          setLoadingActive(false);
          setUrl("https://www.soyyo.digital/u/#/" + response.data.public_id);
          setFondo(
            "https://api.soyyo.digital" + response.data.profile.background
          );
        }
        if (response.detail === "Not found.") {
          setLoadingActive(false);
        }
      }, 1500);
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {loadingActive ? (
        <>
          <div className={style.backContainer2}>
            <Loading />
          </div>
        </>
      ) : (
        <>
          <div className={style.containerPrincipal}>
            <div className={style.containerImage}>
              <img id="img" src={fondo} />
            </div>
            <div className={style.backContainer}>
              <div
                className={style.backRectangle}
                style={{ backgroundColor: color }}
              ></div>

              <div className={style.auxProfileContainer}>
                <Row className={style.profileContainer}>
                  <div className={style.imageContainer}>
                    <img
                      className={style.imageAvatar}
                      src={"https://api.soyyo.digital" + profile.profile?.image}
                      alt="img"
                    />
                  </div>
                  <div>
                    <div className={style.infoContainer}>
                      <div className={style.infoDisplayName}>
                        {profile.profile?.public_name}
                      </div>
                      <div className={style.infoCareer}>
                        {profile.profile?.career}
                      </div>
                    </div>
                    <div
                      className={style.othersContainer}
                      {...events}
                      ref={ref}
                    >
                      <div className={style.qrContainer} onClick={handleOpen}>
                        <img
                          src={require("../../assets/Iconos/qr_code.png")}
                          className={style.qrIcon}
                        />
                        <br />
                        Modo Offline
                      </div>
                      <div>
                        <Contact
                          theme={color}
                          style={`${style.saveContainer}`}
                        ></Contact>
                      </div>
                    </div>
                    <div
                      className={style.edit_profile_icons}
                      {...events}
                      ref={ref}
                    >
                      {whatsapp !== null ? (
                        <div className={style.edit_profile_icons_item}>
                          <button className={style.btn_custom}>
                            <img
                              alt=""
                              src={require("../../assets/Iconos/icon whatsapp.png")}
                            />
                            <p> WhatsApp </p>
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                      {phoneNumber !== null ? (
                        <div className={style.edit_profile_icons_item}>
                          <button className={style.btn_custom}>
                            <img
                              alt=""
                              src={require("../../assets/Iconos/icon telefono.png")}
                            />
                            <p> Llamar </p>
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                      {email !== null ? (
                        <div className={style.edit_profile_icons_item}>
                          <button className={style.btn_custom}>
                            <img
                              alt=""
                              src={require("../../assets/Iconos/icon correo.png")}
                            />
                            <p> E-mail </p>
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                      {mapa !== null ? (
                        <div className={style.edit_profile_icons_item}>
                          <button className={style.btn_custom}>
                            <img
                              alt=""
                              src={require("../../assets/Iconos/icon ubicacion.png")}
                            />
                            <p> Mapa </p>
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                      {dataSocialMedia.map((socialMedia) => (
                        <div
                          key={socialMedia.social_media.id}
                          className={style.edit_profile_icons_item}
                        >
                          {socialMedia.social_media.url_base ===
                          "www.linkedin.com" ? (
                            <button className={style.btn_custom}>
                              <div className=""> </div>
                              <img
                                alt=""
                                src={imageSocialMedia(
                                  socialMedia.social_media.id
                                )}
                              />
                              <p> {socialMedia.social_media.title} </p>
                            </button>
                          ) : (
                            <button className={style.btn_custom}>
                              <div className=""> </div>
                              <img
                                alt=""
                                src={imageSocialMedia(
                                  socialMedia.social_media.id
                                )}
                              />
                              <p> {socialMedia.social_media.title} </p>
                            </button>
                          )}
                        </div>
                      ))}

                      {personalLink.map((link) => (
                        <div
                          key={link.id}
                          className={style.edit_profile_icons_item}
                        >
                          <button className={style.btn_custom}>
                            <img
                              alt=""
                              src={"https://api.soyyo.digital" + link.image}
                            />
                            <p>{`${link.title}`}</p>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Row>
              </div>
              <br />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default PublicProfileView;

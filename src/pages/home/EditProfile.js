/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import style from "../../styles/editProfileView.module.css";
import { RiPencilFill } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { DOMAIN } from "../../config/Constant";
import Loading from "../../components/Loading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
/*para alerta de rellenado de datos*/ 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const [stateUser, setStateUser] = useState(true);
  const [stateEmail, setStateEmail] = useState(true);
  const [statePhone, setStatePhone] = useState(true);
  const [stateMe, setStateMe] = useState(true);
  const token = useSelector((state) => state.login.token);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [loadingActive, setLoadingActive] = useState(false);

  function handleLink() {
    if (user.public_id !== undefined) {
      let link = "https://www.soyyo.digital/u/#/" + user.public_id;

      return link;
    }
  }

  useEffect(() => {
    setLoadingActive(true);
    getUser();
    getProfile();
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
      setUsername(data.username);
      setEmail(data.email);
      setPhoneNumber(data.phone_number);
      setUser(data);
      getProfile();
    });
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
      setTimeout(() => {
        if (response.success === true) {
          setDescription(response.data.description);
          setProfile(response.data);
          setLoadingActive(false);
        }
      }, 1500);
    });
  };

  const updateUser = async (setState) => {
    setState(true);
    user.username = username;
    user.email = email;
    user.phone_number = phoneNumber;

    const response = await fetch(DOMAIN + "auth/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(user),
    });
    await response.json().then((data) => {});
  };

  const updateProfile = async (setState) => {
    setState(true);
    profile.description = description;
    const response = await fetch(DOMAIN + "profile/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ description: description }),
    });
    await response.json().then((data) => {});
  };

  /** valores para los errores de los campos vacios las validaciones se encuentran al final del codigo despues del return*/
  const errorMensaje = validacion(phoneNumber);
  const errorMensajeUser = validacion2(username);
  const errorMensajeEmail = validacion3(email);
  // const AlertDismissibleExampleRest = AlertDismissibleExample(phoneNumber);

  

  

  return (
    <>
      {loadingActive ? (
        <Loading />
      ) : (
        <div className={style.container_profile}>
          {/* <div>{AlertDismissibleExampleRest}</div> */}
          <div className={style.inputs}>
            <img
              className={style.img_icon}
              src={require("../../assets/Iconos/icon perfil.png")}
            />
            {stateUser ? (
              <>
                <button
                  className={style.btn_custom_p}
                  onClick={() => setStateUser(false)}
                >
                  <RiPencilFill></RiPencilFill>
                </button>
                <div className={style.txt_custom_p}>
                  <p>{username === "" ? "Nombre de usuario" : username}</p>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={username}
                  required
                  placeholder="Nombre de Usuario"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className={style.container_btn_check}>
                  <button
                    className={style.btn_custom_check}
                    onClick={() => {
                      setStateUser(true);
                      setUsername(user.username);
                    }}
                  >
                    <IoIosClose> </IoIosClose>
                  </button>
                  <button
                    className={style.btn_custom_check}
                    onClick={() => {
                      updateUser(setStateUser);
                    }}
                  >
                    <BiCheck> </BiCheck>
                  </button>
                </div>
              </>
            )}
          </div>
          <p >{errorMensajeUser}</p>
          
          <div className={style.inputs}>
            <img src={require("../../assets/Iconos/icon correo.png")} />
            {stateEmail ? (
              <>
                <button
                  className={style.btn_custom_p}
                  onClick={() => setStateEmail(false)}
                >
                  <RiPencilFill></RiPencilFill>
                </button>
                <div className={style.txt_custom_p}>
                  <p>
                    {" "}
                    {email === "" ? "Correo Electrónico Personal" : email}{" "}
                  </p>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={email}
                  required
                  placeholder="Correo Electrónico Personal"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={style.container_btn_check}>
                  <button
                    className={style.btn_custom_check}
                    onClick={() => {
                      setStateEmail(true);
                      setEmail(user.email);
                    }}
                  >
                    <IoIosClose> </IoIosClose>
                  </button>
                  <button
                    className={style.btn_custom_check}
                    onClick={() => {
                      updateUser(setStateEmail);
                    }}
                  >
                    <BiCheck> </BiCheck>
                  </button>
                </div>
              </>
            )}
          </div>
          <p >{errorMensajeEmail}</p>
          
          <div className={style.inputs}>
            <img src={require("../../assets/Iconos/icon telefono.png")} />
            {statePhone ? (
              <>
                <button
                  className={style.btn_custom_p}
                  onClick={() => setStatePhone(false)}
                >
                  <RiPencilFill></RiPencilFill>
                </button>
                <div className={style.txt_custom_p}>
                  <p>
                    {" "}
                    {phoneNumber === ""
                      ? "Teléfono Personal"
                      : "+" + phoneNumber}
                  </p>
                </div>
              </>
            ) : (
              <>
                <PhoneInput
                  preferredCountries={["bo", "pe", "co", "es"]}
                  inputStyle={{
                    width: "100%",
                    height: "100%",
                    fontSize: "medium",
                    fontWeight: "bold",
                    border: "none ",
                    color: "black",
                  }}
                  containerStyle={{
                    width: "100%",
                    border: "none ",
                    color: "black",
                  }}
                  buttonStyle={{
                    border: "none ",
                    color: "black",
                  }}
                  buttonClass={{
                    color: "black",
                  }}
                  placeholder="Telefóno Personal"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  required
                />
                
                <div className={style.container_btn_check}>
                  <button
                    className={style.btn_custom_check}
                    onClick={() => {
                      setStatePhone(true);
                      setPhoneNumber(user.phone_number);
                    }}
                  >
                    <IoIosClose> </IoIosClose>
                  </button>
                  <button
                    className={style.btn_custom_check}
                    onClick={() => {
                      updateUser(setStatePhone);
                    }}
                  >
                    <BiCheck> </BiCheck>
                  </button>
                </div>
              </>
            )}
          </div>
          <p >{errorMensaje}</p>
          <div className={style.inputs}>
            <img src={require("../../assets/Iconos/icon acerca de.png")} />
            {stateMe ? (
              <>
                <button
                  className={style.btn_custom_p}
                  onClick={() => setStateMe(false)}
                >
                  <RiPencilFill></RiPencilFill>
                </button>
                <div className={style.txt_custom_p}>
                  <p> {description === "" ? "Acerca de Mí" : description} </p>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={description}
                  required
                  placeholder="Acerca de Mí"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className={style.container_btn_check}>
                  <button
                    className={style.btn_custom_check}
                    onClick={() => {
                      setStateMe(true);
                      setDescription(profile.description);
                    }}
                  >
                    <IoIosClose> </IoIosClose>
                  </button>
                  <button
                    className={style.btn_custom_check}
                    onClick={() => {
                      updateProfile(setStateMe);
                    }}
                  >
                    <BiCheck> </BiCheck>
                  </button>
                </div>
              </>
            )}
          </div>
          <div className={style.inputs2}>
            <div className={style.inputs_item}>
              <img src={require("../../assets/Iconos/icon suscripción.png")} />
              <label> Suscripción </label>
            </div>
            <a href={""}> Desactivada</a>
          </div>
          <div className={style.inputs2}>
            <div className={style.inputs_item}>
              <img src={require("../../assets/Iconos/icon enlace.png")} />
              <label> Enlace de Perfil </label>
            </div>
            <a rel="noreferrer" target="_blank" href={handleLink()}>
              Abrir Perfil
            </a>
          </div>
        </div>
      )}
    </>
  );

  
};

/*validadciones de los errores */
const validacion =(phoneNumber) =>{
  if (phoneNumber.length < 4) return (
    <Alert variant="danger">Porfavor ingrese un numero de telefono  </Alert>
  )
}
const validacion2 =(username) =>{
  
  if (username.length < 2) return (
    <Alert variant="danger">Porfavor ingrese un nombre de usuario </Alert>
  )
}
const validacion3 =(email) =>{
  if (!email.includes('@')) return (
    <Alert variant="danger">Porfavor ingrese un correo valido </Alert>
  )
}
// const AlertDismissibleExample =(phoneNumber,email,username) => {
  
//   if (phoneNumber.length < 4 || username <2 || !email.includes('@')) {
//     return (
//       <Alert variant="danger">
//         <Alert.Heading>Rellena tu Informacion!</Alert.Heading>
//         <p>
//           Necesitamos que rellenes los campos vacios con tus datos personales.
//         </p>
//       </Alert>
//     );
//   }
  
// }



export default EditProfile;

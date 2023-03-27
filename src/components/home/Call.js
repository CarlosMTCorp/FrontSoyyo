import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DOMAIN } from "../../config/Constant";
import style from "../../styles/editProfile2View.module.css";
import Loading from "../Loading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const Call = ({ handleOnHide }) => {
  const [loadingActive, setLoadingActive] = useState(false);

  const [visible, setVisible] = useState(
    require("../../assets/Iconos/icon ojo a.png")
  );
  const [booleanBoton, setBoleanBoton] = useState(true);
  const token = useSelector((state) => state.login.token);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phone, setPhone] = useState({});

  const updateVisible = () => {
    if (booleanBoton) setVisible(require("../../assets/Iconos/icon ojo c.png"));
    else setVisible(require("../../assets/Iconos/icon ojo a.png"));
    setBoleanBoton(!booleanBoton);
  };
  useEffect(() => {
    getPhone();
  }, []);

  const getPhone = async () => {
    const response = await fetch(DOMAIN + "profile/phone", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((response) => {
      if (response.success === true) {
        setPhoneNumber(response.data.phone);
        setBoleanBoton(response.data.is_visible);
        setPhone(response.data);
      }
    });
  };

  const updatePhone = async () => {
    setLoadingActive(true);
    phone.phone = phoneNumber;
    phone.is_visible = booleanBoton;

    const response = await fetch(DOMAIN + "profile/phone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ phone: phoneNumber, is_visible: booleanBoton }),
    });
    await response.json().then((data) => {
      setLoadingActive(false);
      handleOnHide();
    });
  };

  return (
    <div>
      {loadingActive ? (
        <Loading />
      ) : (
        <div className={style.cont_whatsapp}>
          <div className={style.whatsapp_item}>
            <label> Numero telefonico: </label>
            <PhoneInput
              inputStyle={{
                width: "100%",
                height: "40px",
                fontSize: "medium",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
              containerStyle={{
                width: "auto",
                justifyContent: "center",
                boxShadow: "0px 5px 5px #a1a1a1",
                borderRadius: "20px",
              }}
              preferredCountries={["bo", "pe", "co", "es"]}
              placeholder="70000000"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          <div className={style.whatsapp_item_btn}>
            <img
              className={style.img_ojo}
              src={visible}
              onClick={updateVisible}
              alt=""
            />
            <button
              className={style.btn_primary}
              onClick={() => {
                updatePhone();
              }}
            >
              Guardar Datos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Call;

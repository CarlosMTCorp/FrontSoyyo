import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { DOMAIN } from "../../config/Constant";
import style from "../../styles/editProfile2View.module.css";

const Design = ({ setColor }) => {
  const imgRef = useRef(null);
  const token = useSelector((state) => state.login.token);
  const [theme, setTheme] = useState("");
  const [loadingActive, setLoadingActive] = useState(false);

  useEffect(() => {
    getColor();
  }, []);

  const getColor = async () => {
    const response = await fetch(DOMAIN + "profile/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((response) => {
      if (response.success === true) {
      }
    });
  };

  const setThemeProfile = async () => {
    setLoadingActive(true);
    const response = await fetch(DOMAIN + "profile/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ color: theme }),
    });
    await response.json().then((response) => {
      setLoadingActive(false);
    });
  };

  const handleDisegnColor = async (e, color, type) => {
    const containerColor = imgRef.current;
    containerColor.className += " border-design-focus";
    setTheme(color);
    setColor(color);
  };

  function changeColor() {
    let input = document.querySelector("input").value;
    let texto = document.getElementById("texto");
    texto.textContent = input;
    setTheme(input);
    setColor(input);
  }

  return (
    <>
      {loadingActive ? (
        <Loading />
      ) : (
        <>
          {/* <div className={style.design_color}>
            <div
              ref={imgRef}
              className={style.color1}
              onClick={(e) => handleDisegnColor(e, "#FFD400", 1)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color2}
              onClick={(e) => handleDisegnColor(e, "#FFBDEC", 2)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color3}
              onClick={(e) => handleDisegnColor(e, "#BF8EB1", 3)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color4}
              onClick={(e) => handleDisegnColor(e, "#F3911A", 4)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color5}
              onClick={(e) => handleDisegnColor(e, "#2196F3", 5)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color6}
              onClick={(e) => handleDisegnColor(e, "#EACCAD", 6)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color7}
              onClick={(e) => handleDisegnColor(e, "#D12F2F", 7)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color8}
              onClick={(e) => handleDisegnColor(e, "#003174", 8)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color9}
              onClick={(e) => handleDisegnColor(e, "#2B9951", 9)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color10}
              onClick={(e) => handleDisegnColor(e, "#624028", 10)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color11}
              onClick={(e) => handleDisegnColor(e, "#6D6D6D", 11)}
            >
              {" "}
            </div>
            <div
              ref={imgRef}
              className={style.color12}
              onClick={(e) => handleDisegnColor(e, "#1E1E1E", 12)}
            >
              {" "}
            </div>
          </div> */}
          <div>
            <div className={style.inputColor}>
              <input className="input" type="color" onChange={changeColor} />
              <label id="texto">#000000</label>
            </div>
            <div className={style.container_button}>
              <button
                className={style.btn_primary}
                onClick={() => setThemeProfile()}
              >
                Guardar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Design;

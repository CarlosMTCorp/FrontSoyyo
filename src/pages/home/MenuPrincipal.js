import { useEffect, useState } from "react";

import { Accordion } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import style from "../../styles/menuView.module.css";
import styleEdit2 from "../../styles/editProfile2View.module.css";

import DashboardView from "./DashboardView";
import EditProfile from "./EditProfile";
import EditProfile2 from "./EditProfile2";
import Design from "./Design";
import { DOMAIN, ROUTER_INITIAL } from "../../config/Constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/loginSlice";

const MenuPrincipal = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [designState, setDesignState] = useState(false);
  const [user, setUser] = useState({});
  const token = useSelector((state) => state.login.token);
  const [statistic, setStatistic] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  function handleLink() {
    if (user.public_id !== undefined) {
      let link = "https://www.soyyo.digital/u/#/" + user.public_id;

      return link;
    }
  }

  const getStatistic = async () => {
    const response = await fetch(DOMAIN + "profile/statistics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((response) => {
      if (response.success === true) {
        setStatistic(response.data);
      }
    });
  };

  const getUser = async () => {
    const response = await fetch(DOMAIN + "auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    await response.json().then((data) => {
      if (data.detail === "Invalid Token") {
        dispatch(userLogout(token));
        return history(ROUTER_INITIAL);
      }
      setUser(data);
    });
  };

  return (
    <div className={style.menuView}>
      <div className={style.contenedor}>
        <Accordion className={style.accordion}>
          <Accordion.Item eventKey="1" className={style.items}>
            <Accordion.Header
              className={style.title}
              onClick={() => getStatistic()}
            >
              <h4>Estadisticas de Perfil</h4>
            </Accordion.Header>
            <AccordionBody>
              <DashboardView statistic={statistic}></DashboardView>
            </AccordionBody>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className={style.items}>
            <Accordion.Header className={style.title}>
              <h4>Datos de Cuenta</h4>
            </Accordion.Header>
            <AccordionBody>
              <EditProfile></EditProfile>
            </AccordionBody>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className={style.items}>
            <Accordion.Header className={style.title}>
              <h4>Edición del Perfil</h4>
            </Accordion.Header>
            <AccordionBody>
              {!designState && (
                <div className={styleEdit2.container_buttons}>
                  <div className={styleEdit2.container_buttons_items}>
                    <a rel="noreferrer" target="_blank" href={handleLink()}>
                      Vista Previa
                    </a>
                  </div>
                </div>
              )}
              {designState ? <Design /> : <EditProfile2 />}
            </AccordionBody>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};
export default MenuPrincipal;

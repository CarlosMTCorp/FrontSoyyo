import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "../../src/styles/header_footer.module.css";
import logo from "../../src/assets/Iconos/Logo soy yo blanco.png";
import { userLogout } from "../redux/loginSlice";
import { ROUTER_INITIAL } from "../config/Constant";
import { auth } from "../firebase/FirebaseUtils";

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    auth.onAuthStateChanged(function (userFirebase) {
      if (userFirebase) {
        setUser(userFirebase);
      }
    });
  });

  const logout = () => {
    auth.signOut(user);
    dispatch(userLogout(token));
    history(ROUTER_INITIAL);
  };

  return (
    <div className={style.navContainer}>
      {" "}
      {token && (
        <Navbar className={style.nav}>
          <Navbar.Brand>
            <Link to="/" className={`${style.logo}`}>
              <img src={logo} alt="Logotipo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="mr-auto"> </Nav>
          </Navbar.Collapse>
          <button className={style.button} onClick={logout}>
            Cerrar sesión
          </button>
        </Navbar>
      )}
    </div>
  );
};
export default Header;

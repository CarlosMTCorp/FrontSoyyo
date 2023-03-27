import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import style from "../../src/styles/header_footer.module.css";
import { useSelector } from "react-redux";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import { FaLocationArrow } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import logoMtcorp from "../assets/Iconos/logo-mt-corp.svg";

const Footer = () => {
  const token = useSelector((state) => state.login.token);

  return (
    <div>
      {" "}
      {token && (
        <footer className={style.footer}>
          <Container>
            <div>
              <img src={logoMtcorp} alt="Logotipo Mtcorp" />
            </div>
            <Stack gap={2}>
              <div className="">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://goo.gl/maps/9TUtb58UK1SQH91WA"
                >
                  <FaLocationArrow className={style.customIcon} /> Av. Irala,
                  Edificio Irala 452.
                </a>
              </div>
              <div className="">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="mailto:contacto@mtcorplatam.com?subject=Servicio al cliente&body=Por favor, escribe tu consulta."
                >
                  <AiOutlineMail className={style.customIcon} />
                  contacto@mtcorplatam.com
                </a>
              </div>
              <div className={style.customLine}>
                <strong>MTCORP</strong>
              </div>
              <div className="">2022 - DERECHOS RESERVADOS</div>
              <div className="">
                PROYECTO DE :
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://nodabolivia.github.io/"
                >
                  &nbsp; CLADERA
                </a>
              </div>
            </Stack>
            <hr className={style.separator} />
            <Stack className={style.copyright} direction="horizontal">
              <div>&#169;2022 MTCorp </div>
              <div className="ms-auto">
                <Stack direction="horizontal" gap={2}>
                  <div>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href="https://www.facebook.com/mtcorplatam"
                    >
                      <TiSocialFacebook className={style.socialIcon} />
                    </a>
                  </div>
                  <div>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href="https://br.linkedin.com/company/mtcorp-latam"
                    >
                      <TiSocialLinkedin className={style.socialIcon} />
                    </a>
                  </div>
                  <div>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href="mailto:contacto@mtcorplatam.com?subject=Servicio al cliente&body=Por favor, escribe tu consulta."
                    >
                      <AiOutlineMail className={style.socialIcon} />
                    </a>
                  </div>
                </Stack>
              </div>
            </Stack>
          </Container>
        </footer>
      )}
    </div>
  );
};
export default Footer;

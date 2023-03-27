/* eslint-disable jsx-a11y/alt-text */
import { Card, Col, Row } from "react-bootstrap";
import { IMAGE_DOMAIN } from "../../config/Constant";
import style from "../../styles/dashboardView.module.css";

const DashboardView = ({ statistic }) => {
  return (
    <div className={style.entryContainer}>
      <h4>En este apartado puedes ver las interacciones que tuvo tu perfil.</h4>
      <Row sm={2} className={style.rowcito}>
        {statistic?.profile !== undefined && statistic.profile !== null ? (
          <Col sm={12} className={style.colMain}>
            <Card className={`mt-3 text-center ${style.cardMain}`}>
              <Card.Body className={style.cardBodyMain}>
                <img
                  className={style.imgs}
                  src={require("../../assets/Iconos/icon perfil.png")}
                />
                <Card.Title className={style.mediaMain}>
                  Visitas del perfil
                </Card.Title>
                <Card.Title className={style.contadorMain}>
                  {statistic?.profile}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <></>
        )}

        {statistic?.whatsapp !== undefined && statistic.whatsapp !== null ? (
          <Col className={style.colcito}>
            <Card className={`mt-3 text-center ${style.cards}`}>
              <Card.Body className={style.cardBody}>
                <img
                  className={style.imgs}
                  src={IMAGE_DOMAIN + statistic.whatsapp.image}
                />
                <Card.Title className={style.media}>Whatsapp</Card.Title>
                <Card.Title className={style.contador}>
                  {statistic?.whatsapp.counter}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <></>
        )}

        {statistic.email !== undefined && statistic.email !== null ? (
          <Col className={style.colcito}>
            <Card className={`mt-3 text-center ${style.cards}`}>
              <Card.Body className={style.cardBody}>
                {" "}
                <img
                  className={style.imgs}
                  src={IMAGE_DOMAIN + statistic.email.image}
                />
                <Card.Title className={style.media}>Email</Card.Title>
                <Card.Title className={style.contador}>
                  {statistic?.email.counter}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <></>
        )}

        {statistic.phone !== undefined && statistic.phone !== null ? (
          <Col className={style.colcito}>
            <Card className={`mt-3 text-center ${style.cards}`}>
              <Card.Body className={style.cardBody}>
                {" "}
                <img
                  className={style.imgs}
                  src={IMAGE_DOMAIN + statistic.phone.image}
                />
                <Card.Title className={style.media}>Teléfono</Card.Title>
                <Card.Title className={style.contador}>
                  {statistic?.phone.counter}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <></>
        )}

        {statistic.map !== undefined && statistic.map !== null ? (
          <Col className={style.colcito}>
            <Card className={`mt-3 text-center ${style.cards}`}>
              <Card.Body className={style.cardBody}>
                {" "}
                <img
                  className={style.imgs}
                  src={require("../../assets//Iconos/icon ubicacion.png")}
                />
                <Card.Title className={style.media}>Localización</Card.Title>
                <Card.Title className={style.contador}>
                  {statistic?.map.counter}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <></>
        )}

        {statistic.social_media_list?.map((link, index) => (
          <Col className={style.colcito} key={index + link.social_media.title}>
            <Card className={`mt-3 text-center ${style.cards}`}>
              <Card.Body className={style.cardBody}>
                {" "}
                <img
                  className={style.imgs}
                  src={IMAGE_DOMAIN + link.social_media.image}
                />
                <Card.Title className={style.media}>
                  {link.social_media.title}
                </Card.Title>
                <Card.Title className={style.contador}>
                  {link.counter}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {statistic.custom_social_list?.map((link, index) => (
          <Col className={style.colcito} key={index + link.title}>
            <Card className={`mt-3 text-center ${style.cards}`}>
              <Card.Body className={style.cardBody}>
                {" "}
                <img
                  className={style.imgs}
                  alt=""
                  src={IMAGE_DOMAIN + link.image}
                />
                <Card.Title className={style.media}>{link.title}</Card.Title>
                <Card.Title className={style.contador}>
                  {link.counter}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardView;

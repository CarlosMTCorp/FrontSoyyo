import { Modal } from "react-bootstrap";
import styleAlert from "../../styles/alertView.module.css";

const ModalAlert = (props) => {
  return (
    <>
      <Modal
        contentClassName={styleAlert.modalContent}
        className={styleAlert.modal}
        show={props.showModal}
        centered
      >
        <Modal.Header className={styleAlert.modalHeader}>
          <Modal.Title>
            <h2>{props.title}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.body}</p>
          <b>{props.dynamicData}</b>
        </Modal.Body>
        <Modal.Footer className={styleAlert.modalFooter}>
          <button className={styleAlert.modalButton} onClick={props.onHide}>
            {props.textButton}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlert;

import React from 'react'
import { Modal } from 'react-bootstrap'
import style  from '../../styles/editProfile2View.module.css'

const ModalDefault = (props) => {
    return (
            <Modal
                {...props}
                size={props.size}
                dialogClassName = {props.width}
                aria-labelledby=""
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className={style.title}>
                        <h3>{props.title}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   {props.children}
                </Modal.Body>
            </Modal>
    )
}

export default ModalDefault
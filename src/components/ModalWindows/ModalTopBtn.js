import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";

class ModalTopBtn extends Component {
    render() {
        const {show, handleClose, headerText, bodyText, btnText, handleBtn, closeText} = this.props;
        return (
            <>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header>
                        <Modal.Title>{headerText}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{bodyText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            {closeText}
                        </Button>
                        <Button variant="info" onClick={handleBtn}>
                            {btnText}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalTopBtn;
import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";

class ModalTopBtn extends Component {
    render() {
        const {show, handleClose, headerText, bodyText, btnText, handleBtn, closeText} = this.props;
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{headerText}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{bodyText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={handleBtn}>
                            {btnText}
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            {closeText}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalTopBtn;
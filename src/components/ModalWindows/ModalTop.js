import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";

class ModalTop extends Component {
    render() {
        const {show, handleClose, headerText, bodyText, closeText} = this.props;
        return (
            <>
                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header>
                        <Modal.Title>{headerText}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{bodyText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            {closeText}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalTop;
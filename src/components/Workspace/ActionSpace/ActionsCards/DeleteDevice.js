import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Accordion, Card, Button, Form} from "react-bootstrap";
import dataActionService from "../../../../services/dataActionService";
import {ModalTop} from "../../../ModalWindows";

class LegacyDeleteDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: false,
            showModal: false,
            modalInfo: {
                header: "",
                text: ""
            }
        };
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    sendDeleteRequest(event) {
        let form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity()) {
            let deviceCode = form.elements.deviceCode.value.trim();

            dataActionService.deleteDevice(deviceCode)
                .then(() => {
                    this.setState({
                        showModal: true,
                        modalInfo: {
                            header: this.props.t('successOperation'),
                            text: this.props.t('deletedDevice')
                        }
                    });
                })
                .catch((error) => {
                    this.setState({
                        showModal: true,
                        modalInfo: {
                            header: this.props.t('failOperation'),
                            text: this.props.t(error)
                        }
                    })
                });
        } else {
            event.stopPropagation();
        }

        this.setState({
            validate: true
        })
    }

    handleCloseModal() {
        this.setState({
            showModal: false
        })
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <ModalTop
                    headerText={this.state.modalInfo.header}
                    bodyText={this.state.modalInfo.text}
                    closeText={t('close')}
                    handleClose={this.handleCloseModal}
                    show={this.state.showModal}
                />
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} block variant="outline-danger" size="lg" eventKey={0}>
                                {t('deleteDevice')}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={0}>
                            <Card.Body>
                                <Form noValidate validated={this.state.validate} onSubmit={this.sendDeleteRequest}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            {t('deviceCode')}
                                        </Form.Label>
                                        <Form.Control
                                            name='deviceCode'
                                            type='text'
                                            pattern='^\d{7,15}'
                                            placeholder={t('deviceCode')}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {t('invalidFormat')}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="warning" type="submit" block>
                                        {t('delete')}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        )
    }
}

const DeleteDevice = withTranslation()(LegacyDeleteDevice);
export default DeleteDevice;
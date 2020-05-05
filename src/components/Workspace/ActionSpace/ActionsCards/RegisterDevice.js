import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Accordion, Card, Button, Form} from "react-bootstrap";
import dataActionService from "../../../../services/dataActionService";
import {ModalTop} from "../../../ModalWindows";

class LegacyRegisterDevice extends Component {
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
        this.sendCreateRequest = this.sendCreateRequest.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    sendCreateRequest(event) {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity()) {
            const args = {
                deviceCode: form.elements.deviceCode.value.trim(),
                deviceName: form.elements.deviceName.value.trim()
            };
            dataActionService.createDevice(args)
                .then(() => {
                    this.setState({
                        showModal: true,
                        modalInfo: {
                            header: this.props.t('successOperation'),
                            text: this.props.t('registeredDevice')
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
                            <Accordion.Toggle as={Button} block variant="outline-success" size="lg" eventKey={0}>
                                {t('registerDevice')}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={0}>
                            <Card.Body>
                                <Form noValidate validated={this.state.validate} onSubmit={this.sendCreateRequest}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            {t('deviceCode')}
                                        </Form.Label>
                                        <Form.Control
                                            name='deviceCode'
                                            type='text'
                                            pattern='^\d{7,15}'
                                            placeholder={t('deviceCode')}
                                            required
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {t('invalidFormat')}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            {t('deviceName')}
                                        </Form.Label>
                                        <Form.Control
                                            name='deviceName'
                                            type='text'
                                            pattern='^.{4,15}'
                                            placeholder={t('createName')}
                                            required
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {t('invalidFormat')}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="info" type="submit" block>
                                        {t('register')}
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

const RegisterDevice = withTranslation()(LegacyRegisterDevice);
export default RegisterDevice;
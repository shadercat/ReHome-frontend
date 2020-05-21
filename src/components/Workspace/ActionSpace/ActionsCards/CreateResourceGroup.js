import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Accordion, Card, Button, Form} from "react-bootstrap";
import dataActionService from "../../../../services/dataActionService";
import {ModalTop} from "../../../ModalWindows";

class LegacyCreateResourceGroup extends Component {
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
        let form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity()) {
            let args = {
                name: form.elements.resName.value.trim(),
                description: form.elements.resDescription.value.trim()
            };
            dataActionService.createGroup(args)
                .then(() => {
                    this.setState({
                        showModal: true,
                        modalInfo: {
                            header: this.props.t('successOperation'),
                            text: this.props.t('createdResGroup')
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
                                {t('createResourceGroup')}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={0}>
                            <Card.Body>
                                <Form noValidate validated={this.state.validate} onSubmit={this.sendCreateRequest}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            {t('name')}
                                        </Form.Label>
                                        <Form.Control
                                            name='resName'
                                            type='text'
                                            pattern='^.{4,30}$'
                                            placeholder={t('resGroupName')}
                                            required
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {t('invalidFormat')}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                            {t('description')}
                                        </Form.Label>
                                        <Form.Control
                                            name='resDescription'
                                            type='text'
                                            pattern='^.{0,400}'
                                            placeholder={t('resDescription')}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {t('invalidFormat')}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="info" type="submit" block>
                                        {t('create')}
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

const CreateResourceGroup = withTranslation()(LegacyCreateResourceGroup);
export default CreateResourceGroup;
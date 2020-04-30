import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Button, Form} from "react-bootstrap";
import authorizationService from "../../services/authorizationService";
import {withRouter} from "react-router";
import {ModalTop, ModalTopBtn} from "../ModalWindows";
import PropTypes from "prop-types";
import {AppPaths} from "../../constants/AppPaths";


class LegacySignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validate: false,
            show: false,
            showErrorModal: false,
            errorText: "",
            showSuccessModal: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closePasswordModal = this.closePasswordModal.bind(this);
        this.closeSuccessModal = this.closeSuccessModal.bind(this);
        this.linkToSignUp = this.linkToSignUp.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
    }

    static propTypes = {
        history: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired
    };

    closePasswordModal() {
        this.setState({show: false});
    }

    closeErrorModal() {
        this.setState({showErrorModal: false});
    }

    closeSuccessModal() {
        this.setState({showSuccessModal: false});
    }

    linkToSignUp() {
        this.props.history.push(AppPaths.authorization);
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity()) {
            const args = {
                email: form.elements.email.value.trim(),
                password: form.elements.password.value,
                name: form.elements.name.value,
            };
            if (args.password === form.elements.passwordRepeat.value) {
                authorizationService.register(args)
                    .then(() => {
                        this.setState({showSuccessModal: true});
                    })
                    .catch((error) => {
                        this.setState({
                            errorText: this.props.t(error),
                            showErrorModal: true
                        })
                    })
            } else {
                this.setState({show: true})
            }

        } else {
            event.stopPropagation();
        }
        this.setState({validate: true});

    };

    render() {
        const {t} = this.props;
        return (
            <>
                <ModalTop show={this.state.show} handleClose={this.closePasswordModal}
                          headerText={t('invalidData')} bodyText={t('passDidNotMatch')}
                          closeText={t('close')}/>

                <ModalTop show={this.state.showErrorModal} handleClose={this.closeErrorModal}
                          headerText={t('fail')} bodyText={this.state.errorText}
                          closeText={t('close')}/>

                <ModalTopBtn show={this.state.showSuccessModal} handleClose={this.closeSuccessModal}
                             headerText={t('successRegistration')} bodyText={t('successRegistrationText')}
                             closeText={t('close')} btnText={t('toLogin')}
                             handleBtn={this.linkToSignUp}/>


                <div className="pt-4 pb-4">
                    <Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>{t('emailAddress')}</Form.Label>
                            <Form.Control
                                required
                                name='email'
                                type="email"
                                placeholder={t('enterEmail')}/>
                            <Form.Control.Feedback type="invalid">
                                {t('invalidEmail')}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>{t('name')}</Form.Label>
                            <Form.Control
                                required
                                name='name'
                                type="text"
                                placeholder={t('enterName')}/>
                            <Form.Control.Feedback type="invalid">
                                {t('invalidName')}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>{t('password')}</Form.Label>
                            <Form.Control
                                required
                                name="password"
                                type="password"
                                placeholder={t('password')}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicRePassword">
                            <Form.Control
                                required
                                name="passwordRepeat"
                                type="password"
                                placeholder={t('rePassword')}/>
                        </Form.Group>
                        <Button variant="info" type="submit" block>
                            {t('submit')}
                        </Button>
                    </Form>
                </div>
            </>
        )
    }
}

const SignUp = withTranslation()(LegacySignUp);
export default withRouter(SignUp);
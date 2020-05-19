import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import {Button, Form} from "react-bootstrap";
import authorizationService from "../../services/authorizationService";
import dataAccessService from "../../services/dataAccessService";
import {setAuthorized, setUserdata} from "../../actions";
import {connect} from "react-redux";
import {ModalTop} from "../ModalWindows";


class LegacySignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: false,
            showModal: false,
            error: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    static propTypes = {
        t: PropTypes.func.isRequired
    };

    handleModalClose() {
        this.setState({
            showModal: false
        })
    }

    handleSubmit(event) {
        let form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity()) {

            let args = {
                email: form.elements.email.value.trim(),
                password: form.elements.password.value
            };

            authorizationService.login(args)
                .then(async (result) => {
                    if (result) {
                        this.props.onAuthorized();
                        await dataAccessService.getUserData()
                            .then((userData) => {
                                this.props.setUserData(userData);
                            })
                    }
                })
                .catch((error) => {
                    this.setState({
                        error: this.props.t(error),
                        showModal: true
                    })
                })

        } else {
            event.stopPropagation();
        }

        this.setState({
            validate: true
        });
    };

    render() {
        const {t} = this.props;
        return (
            <>
                <ModalTop show={this.state.showModal}
                          handleClose={this.handleModalClose}
                          headerText={t('fail')}
                          bodyText={this.state.error}
                          closeText={t('close')}/>

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
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>{t('password')}</Form.Label>
                            <Form.Control
                                required
                                name="password"
                                type="password"
                                placeholder={t('password')}/>
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

const mapStateToProps = function (store) {
    return {
        isAuthorized: store.authorizedState.isAuthorized
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        onAuthorized: () => dispatch(setAuthorized()),
        setUserData: (data) => dispatch(setUserdata(data))
    }
};

const SignIn = withTranslation()(LegacySignIn);
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
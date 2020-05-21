import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import AccountCard from "./AccountCard";
import {loadingTimeDelay} from "../../constants/Constants";
import dataAccessService from "../../services/dataAccessService";
import Loader from "../Loader";
import {Accordion, Card, Button, Form} from "react-bootstrap";
import {setUserdata} from "../../actions";
import {connect} from "react-redux";
import dataActionService from "../../services/dataActionService";
import {ModalTop} from "../ModalWindows";


class LegacyAccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                _id: "",
                name: "",
                email: "",
                createdAt: ""
            },
            isFetching: true,
            timeDelay: true,
            timerHandler: null,
            validate: false,
            modalShow: false,
            modalInfo: {
                header: "",
                text: ""
            }
        };

        this.pushChanges = this.pushChanges.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.showModal = this.showModal.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
    }

    componentDidMount() {
        let handler = setTimeout(() => {
            this.setState({timeDelay: false})
        }, loadingTimeDelay);
        this.setState({timeHandler: handler});

        this.loadUserData();
    }

    componentWillUnmount() {
        if (this.state.timerHandler !== null) {
            clearTimeout(this.state.timerHandler)
        }
    }

    loadUserData() {
        dataAccessService.getUserData()
            .then((data) => {
                if (data) {
                    this.props.setUserData(data);
                    this.setState({data: data, isFetching: false});
                }
            })
            .catch(this.errorHandler)
    }

    pushChanges(event) {
        event.preventDefault();
        let form = event.currentTarget;
        if (form.checkValidity()) {
            let args = {
                email: form.elements.email.value.trim(),
                name: form.elements.name.value.trim()
            };
            dataActionService.editUserData(args)
                .then(() => {
                    this.loadUserData();
                    this.setState({
                        modalInfo: {
                            text: this.props.t('successOperation'),
                            header: this.props.t('infoChanged')
                        },
                        modalShow: true
                    })
                })
                .catch(this.errorHandler)
        } else {
            event.stopPropagation();
        }
    }

    showModal(show) {
        this.setState({modalShow: show});
    }

    errorHandler(error) {
        this.setState({
            isFetching: false,
            modalInfo: {
                header: this.props.t('failOperation'),
                text: this.props.t(error)
            },
            showModal: true
        });
    }

    render() {
        if (this.state.timeDelay || this.state.isFetching) {
            return <Loader/>
        }
        const {t} = this.props;
        return (<>
            <ModalTop
                show={this.state.modalShow}
                handleClose={() => this.showModal(false)}
                headerText={this.state.modalInfo.header}
                bodyText={this.state.modalInfo.text}
                closeText={t('close')}
            />
            <div className="py4">
                <div className="container overflow-hidden p-3 bg-light container-minimal-height">
                    <AccountCard
                        data={this.state.data}
                    />

                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} block eventKey="0">
                                    {t('changeInfo')}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Form noValidate validated={this.state.validate} onSubmit={this.pushChanges}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>{t('name')}</Form.Label>
                                            <Form.Control
                                                name="name"
                                                type="text"
                                                defaultValue={this.state.data.name}
                                                placeholder={t('enterName')}/>
                                            <Form.Control.Feedback type="invalid">
                                                {t('invalidName')}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>{t('email')}</Form.Label>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                defaultValue={this.state.data.email}
                                                placeholder={t('enterEmail')}/>
                                            <Form.Control.Feedback type="invalid">
                                                {t('invalidEmail')}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Button variant="info" type="submit" block>
                                            {t('submit')}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        </>)
    }
}

const mapStateToProps = function (store) {
    return {
        isAuthorized: store.authorizedState.isAuthorized
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        setUserData: (data) => dispatch(setUserdata(data))
    }
};


const AccountInfo = withTranslation()(LegacyAccountInfo);
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
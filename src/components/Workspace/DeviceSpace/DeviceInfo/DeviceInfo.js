import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router"
import {Button, Card, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {loadingTimeDelay} from "../../../../constants/Constants";
import Loader from '../../../Loader';
import {ModalTop, ModalTopBtn} from "../../../ModalWindows";
import dataAccessService from "../../../../services/dataAccessService";
import dataActionService from "../../../../services/dataActionService";
import {AppPaths} from "../../../../constants/AppPaths";
import DevicePart from "./Cards/DevicePart";
import TriggerPart from "./Cards/TriggersPart";
import DeviceTypePart from "./Cards/DeviceTypePart";

class LegacyDeviceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                deviceStatus: {
                    status: "unknown",
                    state: "unknown"
                },
                deviceName: "Unknown",
                deviceCode: "000000000",
                deviceType: {
                    description: "Unknown",
                    triggers: [],
                    code: "000000",
                    name: "Unknown",
                    createdAt: "2020-04-20T18:05:27.676Z"
                },
                createdAt: "2020-05-02T13:28:00.690Z"
            },
            isFetching: true,
            timeDelay: true,
            timerHandler: null,
            showModal: false,
            modalInfo: {
                title: "",
                text: ""
            },
            showDeletingModal: false
        };
        this.deleteThisDevice = this.deleteThisDevice.bind(this);
        this.downloadInfo = this.downloadInfo.bind(this);
        this.showDeletionModal = this.showDeletionModal.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleTrigger = this.handleTrigger.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
    }

    componentDidMount() {
        let handler = setTimeout(() => {
            this.setState({timeDelay: false})
        }, loadingTimeDelay);
        this.setState({
            timerHandler: handler
        });

        this.downloadInfo();
    }

    componentWillUnmount() {
        if (this.state.timerHandler !== null) {
            clearTimeout(this.state.timerHandler)
        }
    }

    downloadInfo() {
        dataAccessService.getDeviceInfo(this.props.match.params.id)
            .then((data) => {
                this.setState({
                    data: data,
                    isFetching: false
                });
            })
            .catch(this.errorHandler);
    }

    handleTrigger(code) {
        alert(this.state.data.deviceName + " " + code);
    }

    handleModalClose() {
        this.setState({
            showModal: false,
            showDeletingModal: false
        });
    }

    deleteThisDevice() {
        dataActionService.deleteDevice(this.state.data.deviceCode)
            .then(() => {
                this.props.history.push(AppPaths.devices);
            })
            .catch(this.errorHandler)
    }

    showDeletionModal() {
        this.setState({
            showDeletingModal: true
        });
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
        return (
            <>
                <ModalTop
                    show={this.state.showModal}
                    handleClose={this.handleModalClose}
                    headerText={this.state.modalInfo.header}
                    bodyText={this.state.modalInfo.text}
                    closeText={t('close')}/>
                <ModalTopBtn
                    show={this.state.showDeletingModal}
                    handleClose={this.handleModalClose}
                    headerText={t('deleteDevice')}
                    bodyText={t('deleteDeviceText')}
                    closeText={t('close')}
                    btnText={t('delete')}
                    handleBtn={this.deleteThisDevice}
                />
                <div className="py-4">
                    <div className="container overflow-hidden p-3 bg-light" style={{minHeight: "80vh"}}>
                        <Row className="mb-3">

                            <Col sm="4">

                                <DevicePart deviceData={this.state.data}/>

                                <Card className="mb-3">
                                    <Card.Header as="h5">{t('actions')}</Card.Header>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem className="text-center">
                                            <Button variant="outline-primary" block>
                                                {t('addToResGroup')}
                                            </Button>
                                        </ListGroupItem>
                                        <ListGroupItem className="text-center">
                                            <Button variant="outline-danger" block
                                                    onClick={this.showDeletionModal}>
                                                {t('delete')}
                                            </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>

                                <DeviceTypePart deviceType={this.state.data.deviceType}/>

                            </Col>

                            <Col sm="8">
                                <TriggerPart
                                    triggers={this.state.data.deviceType.triggers}
                                    handleTrigger={this.handleTrigger}/>
                            </Col>

                        </Row>
                    </div>
                </div>
            </>
        )
    }
}

const DeviceInfo = withTranslation()(LegacyDeviceInfo);
export default withRouter(DeviceInfo);
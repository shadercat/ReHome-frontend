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
import AddToGroupModal from "./AddToGroupModal";

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
                header: "",
                text: ""
            },
            showDeletingModal: false,
            showGroupModal: false
        };
        this.deleteThisDevice = this.deleteThisDevice.bind(this);
        this.downloadInfo = this.downloadInfo.bind(this);
        this.showDeletionModal = this.showDeletionModal.bind(this);
        this.showInfoModal = this.showInfoModal.bind(this);
        this.handleTrigger = this.handleTrigger.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.showAddToGroupModal = this.showAddToGroupModal.bind(this);
        this.addDeviceToGroup = this.addDeviceToGroup.bind(this);
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

    addDeviceToGroup(resId) {
        dataActionService.addDeviceToResGroup(resId, this.state.data.deviceCode)
            .then(() => {
                this.setState({
                    modalInfo: {
                        header: this.props.t('successOperation'),
                        text: this.props.t('addedToGroupText')
                    },
                    showModal: true,
                    showGroupModal: false
                })
            })
            .catch(this.errorHandler)
    }

    deleteThisDevice() {
        dataActionService.deleteDevice(this.state.data.deviceCode)
            .then(() => {
                this.props.history.push(AppPaths.devices);
            })
            .catch(this.errorHandler)
    }

    handleTrigger(code) {
        alert(this.state.data.deviceName + " " + code);
    }

    showInfoModal(state) {
        this.setState({
            showModal: state
        });
    }

    showDeletionModal(state) {
        this.setState({
            showDeletingModal: state
        });
    }

    showAddToGroupModal(state) {
        this.setState({
            showGroupModal: state
        })
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
                    handleClose={() => this.showInfoModal(false)}
                    headerText={this.state.modalInfo.header}
                    bodyText={this.state.modalInfo.text}
                    closeText={t('close')}/>

                <ModalTopBtn
                    show={this.state.showDeletingModal}
                    handleClose={() => this.showDeletionModal(false)}
                    headerText={t('deleteDevice')}
                    bodyText={t('deleteDeviceText')}
                    closeText={t('close')}
                    btnText={t('delete')}
                    handleBtn={this.deleteThisDevice}/>

                <AddToGroupModal
                    addToGroup={this.addDeviceToGroup}
                    show={this.state.showGroupModal}
                    onHide={() => this.showAddToGroupModal(false)}/>

                <div className="py-4">
                    <div className="container overflow-hidden p-3 bg-light" style={{minHeight: "80vh"}}>
                        <Row className="mb-3">

                            <Col sm="4">

                                <DevicePart deviceData={this.state.data}/>

                                <Card className="mb-3">
                                    <Card.Header as="h5">{t('actions')}</Card.Header>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem className="text-center">
                                            <Button variant="outline-primary" block
                                                    onClick={() => this.showAddToGroupModal(true)}>
                                                {t('addToResGroup')}
                                            </Button>
                                        </ListGroupItem>
                                        <ListGroupItem className="text-center">
                                            <Button variant="outline-danger" block
                                                    onClick={() => this.showDeletionModal(true)}>
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
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import dataAccessService from '../../../../services/dataAccessService';
import dataActionService from "../../../../services/dataActionService";
import ModalTop from "../../../ModalWindows/ModalTop";
import ModalTopBtn from "../../../ModalWindows/ModalTopBtn";
import ResourceGroupInfoCard from "./Cards/ResourceGroupInfoCard";
import {withRouter} from "react-router";
import {loadingTimeDelay} from "../../../../constants/Constants";
import Loader from "../../../Loader";
import DeviceGroupList from "./DevicesView/DeviceGroupList";

class LegacyResourceGroupSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            showModal: false,
            idFetching: true,
            timeDelay: true,
            timerHandler: null,
            info: {
                _id: "00000000",
                name: "unknown",
                description: "unknown",
                createdAt: "2020-05-02T18:44:08.168Z"
            },
            devices: [],
            modalInfo: {
                header: "",
                text: ""
            },
            deletionModalShow: false,
            deletionDeviceCode: "0000000"
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.downloadInfo = this.downloadInfo.bind(this);
        this.loaderDelay = this.loaderDelay.bind(this);
        this.callErrorModal = this.callErrorModal.bind(this);
        this.deleteDeviceFromGroup = this.deleteDeviceFromGroup.bind(this);
        this.showDeletionModal = this.showDeletionModal.bind(this);
    }

    componentDidMount() {
        this.loaderDelay();
        this.downloadInfo();
        this.downloadDevices(this.state.page);
    }

    loaderDelay() {
        let handler = setTimeout(() => {
            this.setState({timeDelay: false})
        }, loadingTimeDelay);
        this.setState({
            timerHandler: handler
        });
    }

    downloadInfo() {
        dataAccessService.getResourceGroupInfo(this.props.match.params.id)
            .then((data) => {
                this.setState({
                    info: data,
                    isFetching: false
                })
            })
            .catch(this.callErrorModal)
    }

    downloadDevices(page) {
        dataAccessService.getResourceGroupDevices(this.props.match.params.id, page)
            .then((data) => {
                this.setState({
                    devices: data.devices
                });
            })
            .catch(this.callErrorModal)
    }

    deleteDeviceFromGroup() {
        dataActionService.deleteDeviceFromGroup(this.props.match.params.id, this.state.deletionDeviceCode)
            .then(() => {
                this.setState({
                    modalInfo: {
                        header: this.props.t('successOperation'),
                        text: this.props.t('deviceDeletedFromGroup')
                    },
                    showModal: true
                });
                this.downloadDevices(this.state.page);
            })
            .catch(this.callErrorModal)
    }

    showDeletionModal(deviceCode) {
        this.setState({
            deletionModalShow: true,
            deletionDeviceCode: deviceCode
        })
    }

    callErrorModal(error) {
        this.setState({
            isFetching: false,
            modalInfo: {
                header: this.props.t('fail'),
                text: this.props.t(error)
            },
            showModal: true
        })
    }

    handleModalClose() {
        this.setState({showModal: false, deletionModalShow: false});
    }

    render() {
        if (this.state.timeDelay || this.state.isFetching) {
            return <Loader/>
        }
        const {t} = this.props;
        return (
            <div className="py-4 container-minimal-height">
                <ModalTop
                    show={this.state.showModal}
                    handleClose={this.handleModalClose}
                    headerText={this.state.modalInfo.header}
                    bodyText={this.state.modalInfo.text}
                    closeText={t('close')}
                />
                <ModalTopBtn
                    show={this.state.deletionModalShow}
                    handleClose={this.handleModalClose}
                    headerText={t('deleteFromGroup')}
                    bodyText={t('deleteFromGroupText')}
                    closeText={t('close')}
                    btnText={t('delete')}
                    handleBtn={this.deleteDeviceFromGroup}
                />
                <div className="container overflow-hidden p-3 bg-light">
                    <ResourceGroupInfoCard info={this.state.info}/>
                    <DeviceGroupList
                        devices={this.state.devices}
                        deleteHandler={this.showDeletionModal}
                    />
                </div>
            </div>
        )
    }
}

const ResourceGroupSpace = withTranslation()(LegacyResourceGroupSpace);
export default withRouter(ResourceGroupSpace);
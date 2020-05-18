import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import {setDeviceData} from "../../../actions";
import {connect} from "react-redux";
import dataAccessService from "../../../services/dataAccessService";
import ModalTop from "../../ModalWindows/ModalTop";
import DevicesList from "./DevicesList";

class LegacyMachineSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            showModal: false,
            errorText: ""
        };
        this.downloadMachines = this.downloadMachines.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount() {
        this.downloadMachines();

    }

    downloadMachines() {
        dataAccessService.getDevices(this.state.page)
            .then((data) => {
                this.props.setDevices(data);
            })
            .catch((error) => {
                this.setState({
                    showModal: true,
                    errorText: this.props.t(error)
                });
            });
    }

    handleModalClose() {
        this.setState({showModal: false});
    }

    render() {
        const {t} = this.props;
        return (
            <div className="py-4 container-minimal-height">
                <ModalTop
                    show={this.state.showModal}
                    handleClose={this.handleModalClose}
                    headerText={t('fail')}
                    bodyText={this.state.errorText}
                    closeText={t('close')}
                />
                <div className="container overflow-hidden p-3 text-center bg-light">
                    <Card className="text-center m-4">
                        <Card.Body>
                            <Card.Title>{t('yourDevices')}</Card.Title>
                            <Card.Text>
                                {t('yourDevicesDescription')}
                            </Card.Text>
                            <Button variant="primary" onClick={this.downloadMachines}>
                                {t('refresh')}
                            </Button>
                        </Card.Body>
                    </Card>
                    <DevicesList/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        machines: store.devicesState.devices
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        setDevices: (data) => dispatch(setDeviceData(data))
    }
};
const MachineSpace = withTranslation()(LegacyMachineSpace);
export default connect(mapStateToProps, mapDispatchToProps)(MachineSpace);
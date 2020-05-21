import React, {Component} from "react";
import {Button, Card, Pagination, Modal} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import {setDeviceData} from "../../../actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import dataAccessService from "../../../services/dataAccessService";
import ModalTop from "../../ModalWindows/ModalTop";
import DevicesList from "./DevicesList";
import queryString from 'query-string'

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
        this.fetchingPage = this.fetchingPage.bind(this);
    }

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        let qsPage = parseInt(query.page);
        if (query.page && qsPage > 0) {
            this.setState({page: qsPage})
        }
        this.downloadMachines(this.state.page);
    }

    downloadMachines(page) {
        dataAccessService.getDevices(page)
            .then((data) => {
                if (data.length !== 0) {
                    this.setState({page: page});
                    this.props.history.push({
                        search: `page=${page}`
                    });
                    this.props.setDevices(data);
                }
            })
            .catch((error) => {
                this.setState({
                    showModal: true,
                    errorText: this.props.t(error)
                });
            });
    }

    fetchingPage(page) {
        if (page > 0) {
            this.downloadMachines(page);
        }
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
                        </Card.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.downloadMachines}>
                                {t('refresh')}
                            </Button>
                            <Pagination>
                                <Pagination.Prev onClick={() => this.fetchingPage(this.state.page - 1)}/>
                                <Pagination.Item active>
                                    {this.state.page}
                                </Pagination.Item>
                                <Pagination.Next onClick={() => this.fetchingPage(this.state.page + 1)}/>
                            </Pagination>
                        </Modal.Footer>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MachineSpace));
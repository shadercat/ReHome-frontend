import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import {setResourceGroups} from "../../../actions";
import {connect} from "react-redux";
import dataAccessService from "../../../services/dataAccessService";
import ModalTop from "../../ModalWindows/ModalTop";
import ResourceGroupsList from "./ResourceGroupsList";

class LegacyResourceGroupsSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            showModal: false,
            errorText: ""
        };
        this.downloadGroups = this.downloadGroups.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount() {
        this.downloadGroups();
    }

    downloadGroups() {
        dataAccessService.getResourceGroups(this.state.page)
            .then((data) => {
                this.props.setGroups(data);
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
            <div className="py-4" style={{minHeight: "88vh"}}>
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
                            <Card.Title>{t('yourResGroups')}</Card.Title>
                            <Card.Text>
                                {t('yourResGroupsDescription')}
                            </Card.Text>
                            <Button variant="primary" onClick={this.downloadGroups}>
                                {t('refresh')}
                            </Button>
                        </Card.Body>
                    </Card>

                    <ResourceGroupsList/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        machines: store.resourceGroupsState.groups
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        setGroups: (data) => dispatch(setResourceGroups(data))
    }
};
const ResourceGroupsSpace = withTranslation()(LegacyResourceGroupsSpace);
export default connect(mapStateToProps, mapDispatchToProps)(ResourceGroupsSpace);
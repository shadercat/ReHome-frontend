import React, {Component} from "react";
import {Button, Card, Modal, Pagination} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import {setResourceGroups} from "../../../actions";
import {connect} from "react-redux";
import dataAccessService from "../../../services/dataAccessService";
import ModalTop from "../../ModalWindows/ModalTop";
import ResourceGroupsList from "./ResourceGroupsList";
import queryString from "query-string";
import {withRouter} from "react-router";

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
        this.fetchingPage = this.fetchingPage.bind(this);
    }

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        let qsPage = parseInt(query.page);
        if (query.page && qsPage > 0) {
            this.setState({page: qsPage})
        }
        this.downloadGroups(this.state.page);
    }

    downloadGroups(page) {
        dataAccessService.getResourceGroups(page)
            .then((data) => {
                if (data.length > 0) {
                    this.setState({
                        page: page
                    });
                    this.props.history.push({
                        search: `page=${page}`
                    });
                    this.props.setGroups(data);
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
            this.downloadGroups(page);
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
                            <Card.Title>{t('yourResGroups')}</Card.Title>
                            <Card.Text>
                                {t('yourResGroupsDescription')}
                            </Card.Text>
                        </Card.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.downloadGroups}>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceGroupsSpace));
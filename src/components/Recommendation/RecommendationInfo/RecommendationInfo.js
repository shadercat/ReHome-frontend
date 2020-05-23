import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router";
import ModalTop from "../../ModalWindows/ModalTop";
import Loader from "../../Loader";
import dataAccessService from "../../../services/dataAccessService";
import {loadingTimeDelay} from "../../../constants/Constants";
import {Card, ListGroup} from "react-bootstrap";

class LegacyRecommendationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalInfo: {
                header: "",
                text: ""
            },
            isFetching: true,
            timeDelay: true,
            timerHandler: null,
            data: {
                text: "",
                title: "",
                _id: "",
                codeWord: "",
                createdAt: "",
                target: []
            }
        };
        this.showModal = this.showModal.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.loaderDelay = this.loaderDelay.bind(this);
    }

    componentDidMount() {
        this.loaderDelay();
        this.downloadData();
    }

    loaderDelay() {
        let handler = setTimeout(() => {
            this.setState({timeDelay: false})
        }, loadingTimeDelay);
        this.setState({
            timerHandler: handler
        });
    }

    downloadData() {
        dataAccessService.getRecommendationById(this.props.match.params.id)
            .then((data) => {
                this.setState({
                    data: data,
                    isFetching: false
                })
            })
            .catch(this.errorHandler)
    }

    showModal(show) {
        this.setState({showModal: show})
    }

    errorHandler(error) {
        this.setState({
            isFetching: false,
            showModal: true,
            modalInfo: {
                header: this.props.t('failOperation'),
                text: this.props.t(error)
            }
        })
    }

    render() {
        const {t} = this.props;
        if (this.state.timeDelay || this.state.isFetching) {
            return (<>
                <Loader/>
            </>)
        }
        return (<>
            <div className="py-4 container container-minimal-height">
                <ModalTop
                    show={this.state.showModal}
                    handleClose={() => this.showModal(false)}
                    headerText={this.state.modalInfo.header}
                    bodyText={this.state.modalInfo.text}
                    closeText={t('close')}
                />
                <Card className="mb-3" border="info">
                    <Card.Header as="h5">
                        {this.state.data.title}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.state.data.text}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            {t('createdDataKey', {date: new Date(this.state.data.createdAt)})}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </>)
    }
}

const RecommendationInfo = withTranslation()(LegacyRecommendationInfo);
export default withRouter(RecommendationInfo);
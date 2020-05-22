import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router";
import queryString from "query-string";
import dataAccessService from "../../services/dataAccessService";
import {loadingTimeDelay} from "../../constants/Constants";
import Loader from "../Loader";
import ModalTop from "../ModalWindows/ModalTop";
import {Button, Card, Modal, Pagination} from "react-bootstrap";
import RecommendationsList from "./RecommendationsList";

class LegacyRecommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            lang: this.props.t('currentLang'),
            isFetching: true,
            timeDelay: true,
            timerHandler: null,
            data: [],
            showModal: false,
            modalInfo: {
                header: "",
                text: ""
            }
        };

        this.downloadData = this.downloadData.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.showModal = this.showModal.bind(this);
        this.fetchingPage = this.fetchingPage.bind(this);
        this.downloadChangedLangData = this.downloadChangedLangData.bind(this);
    }

    componentDidMount() {
        let handler = setTimeout(() => {
            this.setState({timeDelay: false});
        }, loadingTimeDelay);

        this.setState({timerHandler: handler});

        let query = queryString.parse(this.props.location.search);
        let qsPage = parseInt(query.page);
        if (query.page && qsPage > 0) {
            this.setState({page: qsPage})
        }
        this.downloadData(this.state.page, this.state.lang);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.t !== this.props.t) {
            console.log("lang changed");
            this.downloadChangedLangData(this.props.t('currentLang'));
        }
    }


    downloadData(page, lang) {
        dataAccessService.getRecommendations(page, lang)
            .then((data) => {
                if (data.length > 0) {
                    this.setState({
                        data: data,
                        page: page
                    });
                    this.props.history.push({
                        search: `page=${page}`
                    });
                }
                this.setState({
                    isFetching: false
                })
            })
            .catch(this.errorHandler);
    }

    downloadChangedLangData(lang) {
        let page = 1;
        dataAccessService.getRecommendations(page, lang)
            .then((data) => {
                this.setState({
                    data: data,
                    page: page,
                    lang: lang
                });
                this.props.history.push({
                    search: `page=${page}`
                });
            })
            .catch(this.errorHandler)
    }

    fetchingPage(page) {
        if (page > 0) {
            this.downloadData(page, this.state.lang);
        }
    }

    errorHandler(error) {
        this.setState({
            showModal: true,
            modalInfo: {
                header: this.props.t('failOperation'),
                text: this.props.t(error)
            }
        })
    }

    showModal(show) {
        this.setState({
            showModal: show
        })
    }

    render() {
        if (this.state.isFetching || this.state.timeDelay) {
            return <Loader/>
        }
        const {t} = this.props;
        return (<>
            <ModalTop
                show={this.state.showModal}
                handleClose={() => this.showModal(false)}
                headerText={this.state.modalInfo.header}
                bodyText={this.state.modalInfo.text}
                closeText={t('close')}
            />
            <div className="container overflow-hidden p-3 text-center bg-light container-minimal-height">
                <Card className="text-center m-4">
                    <Card.Body>
                        <Card.Title>{t('recommendations')}</Card.Title>
                        <Card.Text>
                            {t('recommendationsDescription')}
                        </Card.Text>
                    </Card.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.downloadData(this.state.page, this.state.lang)}>
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

                <RecommendationsList
                    recommendations={this.state.data}/>
            </div>
        </>)
    }
}

const Recommendations = withTranslation()(LegacyRecommendations);
export default withRouter(Recommendations);
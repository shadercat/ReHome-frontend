import React, {Component} from "react";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {setAuthorized, setUnauthorized, setUserdata} from "../actions";
import {AppPaths} from "../constants/AppPaths";
import {loadingTimeDelay} from "../constants/Constants";
import authorizationService from "../services/authorizationService";
import dataAccessService from "../services/dataAccessService";
import {withTranslation} from "react-i18next";


import Loader from "./Loader";
import Header from "./Header/Header";
import NotFound from "./NotFoundBody/NotFound";
import RedirectWrapper from "./RedirectWrapper";
import Footer from "./Footer/Footer";
import Authorization from "./Authorization/Authorization";
import Workspace from "./Workspace/Workspace";
import AccountInfo from "./Account/AccountInfo";
import MainPage from "./MainPage/MainPage";
import Recommendations from "./Recommendation/Recommendations";
import ModalTop from "./ModalWindows/ModalTop";
import RecommendationInfo from "./Recommendation/RecommendationInfo/RecommendationInfo";
import {UNAUTHORIZED} from "../constants/FailReasons";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            timeDelay: true,
            timerHandler: null,
            showModal: false,
            modalInfo: {
                header: "",
                text: ""
            }
        };
        this.errorHandler = this.errorHandler.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {

        let handler = setTimeout(() => {
            this.setState({timeDelay: false});
        }, loadingTimeDelay);

        this.setState({timerHandler: handler});

        authorizationService.checkAuthorized()
            .then((result) => {
                if (result) {
                    this.props.onAuthorized();
                    dataAccessService.getUserData()
                        .then((userData) => {
                            if (userData) {
                                this.props.setUserData(userData);
                                this.setState({isFetching: false});
                            }
                        })
                } else {
                    this.props.unAuthorized();
                    this.setState({isFetching: false});
                }
            })
            .catch(this.errorHandler)

    }

    componentWillUnmount() {
        if (this.state.timerHandler !== null) {
            clearTimeout(this.state.timerHandler);
        }
    }

    showModal(show) {
        this.setState({showModal: show});
    }

    errorHandler(error) {
        if (error !== UNAUTHORIZED) {
            this.setState({
                showModal: true,
                modalInfo: {
                    header: this.props.t('failOperation'),
                    text: this.props.t(error)
                }
            });
        } else {
            this.props.unAuthorized();
            this.setState({isFetching: false});
        }
    }


    render() {
        const {t} = this.props;
        if (this.state.isFetching || this.state.timeDelay) {
            return (<>
                <ModalTop
                    show={this.state.showModal}
                    handleClose={() => this.showModal(false)}
                    headerText={this.state.modalInfo.header}
                    bodyText={this.state.modalInfo.text}
                    closeText={t('close')}
                />
                <Loader/>
            </>)
        }
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <div id="page-top"/>
                    <Switch>
                        <Route exact path='/'>
                            <MainPage/>
                        </Route>
                        <RedirectWrapper path={AppPaths.workspace} accessible={this.props.isAuthorized}
                                         pathname={AppPaths.signIn}>
                            <Workspace/>
                        </RedirectWrapper>
                        <RedirectWrapper path={AppPaths.authorization} accessible={!this.props.isAuthorized}
                                         pathname={AppPaths.workspace}>
                            <Authorization/>
                        </RedirectWrapper>
                        <RedirectWrapper path={AppPaths.account} accessible={this.props.isAuthorized}
                                         pathname={AppPaths.signIn}>
                            <AccountInfo/>
                        </RedirectWrapper>
                        <Route path={`${AppPaths.recommendations}/:id`}>
                            <RecommendationInfo/>
                        </Route>
                        <Route path={AppPaths.recommendations}>
                            <Recommendations/>
                        </Route>
                        <Route>
                            <NotFound/>
                        </Route>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        isAuthorized: store.authorizedState.isAuthorized
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        onAuthorized: () => dispatch(setAuthorized()),
        unAuthorized: () => dispatch(setUnauthorized()),
        setUserData: (data) => dispatch(setUserdata(data))
    }
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Main));
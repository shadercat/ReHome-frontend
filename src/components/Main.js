import React, {Component} from "react";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {setAuthorized, setUnauthorized, setUserdata} from "../actions";
import {AppPaths} from "../constants/AppPaths";
import {loadingTimeDelay} from "../constants/Constants";
import authorizationService from "../services/authorizationService";
import dataAccessService from "../services/dataAccessService";


import Loader from "./Loader";
import Header from "./Header/Header";
import NotFound from "./NotFoundBody/NotFound";
import RedirectWrapper from "./RedirectWrapper";
import Footer from "./Footer/Footer";
import Authorization from "./Authorization/Authorization";
import Workspace from "./Workspace/Workspace";
import AccountInfo from "./Account/AccountInfo";
import MainPage from "./MainPage/MainPage";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            timeDelay: true,
            timerHandler: null
        }
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
            .catch((error) => {
                this.setState({isFetching: false})
            })

    }

    componentWillUnmount() {
        if (this.state.timerHandler !== null) {
            clearTimeout(this.state.timerHandler);
        }
    }

    render() {
        if (this.state.isFetching || this.state.timeDelay) {
            return <Loader/>
        }
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <div id="pageTop"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
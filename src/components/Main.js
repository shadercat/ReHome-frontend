import React, {Component} from "react";
import Loader from "./Loader";
import Header from "./Header/Header";
import NotFound from "./NotFoundBody/NotFound";
import RedirectWrapper from "./RedirectWrapper";
import Footer from "./Footer/Footer";
import DevelopmentBody from "./InDevelopmentBody/DevelopmentBody";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {setAuthorized, setUnauthorized, setUserdata} from "../actions";
import {connect} from "react-redux";
import {AppPaths} from "../constants/AppPaths";
import authorizationService from "../services/authorizationService";
import dataAccessService from "../services/dataAccessService";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true
        }
    }

    componentDidMount() {
        authorizationService.checkAuthorized()
            .then((result) => {
                if (result) {
                    this.props.onAuthorized();
                    dataAccessService.getUserData()
                        .then((userData) => {
                            this.props.setUserData(userData);
                            this.setState({isFetching: false});
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

    render() {
        if (this.state.isFetching) {
            return <Loader/>
        }
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <div id="pageTop"/>
                    <Switch>
                        <Route exact path='/'>
                            <DevelopmentBody Description="Main page here"/>
                        </Route>
                        <RedirectWrapper path={AppPaths.workspace} accessible={this.props.isAuthorized}
                                         pathname={AppPaths.signIn}>
                            <DevelopmentBody Description="workspace here"/>
                        </RedirectWrapper>
                        <RedirectWrapper path={AppPaths.authorization} accessible={!this.props.isAuthorized}
                                         pathname={AppPaths.signIn}>
                            <DevelopmentBody Description="authorization here"/>
                        </RedirectWrapper>
                        <RedirectWrapper path={AppPaths.account} accessible={this.props.isAuthorized}
                                         pathname={AppPaths.signIn}>
                            <DevelopmentBody Description="Account info here"/>
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
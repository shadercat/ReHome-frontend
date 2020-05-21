import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {NavDropdown} from "react-bootstrap";
import {connect} from 'react-redux';
import AuthorizationService from "../../../../services/authorizationService";
import {setUnauthorized} from "../../../../actions";
import {HashLink as Link} from "react-router-hash-link";
import PropTypes from "prop-types";


class LegacyAuthorizedWindow extends Component {
    constructor(props) {
        super(props);
        this.logoutReq = this.logoutReq.bind(this);
    }

    static propTypes = {
        t: PropTypes.func.isRequired
    };

    logoutReq() {
        AuthorizationService.logout()
            .then(() => {
                this.props.unAuthorize();
            })
            .catch((err) => {
                alert(err);
            });
    }

    render() {
        const {t, email, name} = this.props;
        return (
            <>
                <NavDropdown title={t('account')} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/account#page-top"}>{name}</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item as={Link} to={"/account#page-top"}>{email}</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.logoutReq}>{t('logout')}</NavDropdown.Item>
                </NavDropdown>
            </>
        )
    }
}


const mapStateToProps = function (store) {
    return {
        email: store.userdataState.email,
        name: store.userdataState.name
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        unAuthorize: () => dispatch(setUnauthorized()),
    };
};

const AuthorizedWindow = withTranslation()(LegacyAuthorizedWindow);
export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedWindow);
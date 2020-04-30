import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


class LegacyUnauthorizedWindow extends Component {

    static propTypes = {
        t: PropTypes.func.isRequired
    };

    render() {
        const {t} = this.props;
        return (
            <NavDropdown title={t('account')} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/authorization/signin">{t('signIn')}</NavDropdown.Item>
                <NavDropdown.Divider/>
            </NavDropdown>

        )
    }
}

const UnauthorizedWindow = withTranslation()(LegacyUnauthorizedWindow);
export default UnauthorizedWindow;
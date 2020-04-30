import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next';
import UserWindow from "./Dropdown/UserWindow";
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class LegacyHeader extends Component {
    constructor(props) {
        super(props);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    static propTypes = {
        t: PropTypes.func.isRequired,
        i18n: PropTypes.object.isRequired
    };

    changeLanguage(lng, e) {
        const {i18n} = this.props;
        i18n.changeLanguage(lng);
    }

    render() {
        const {t} = this.props;
        return (
            <Navbar expand="lg" sticky="top" variant="dark" className="bg-teal" collapseOnSelect={true}>
                <Navbar.Brand as={Link} to="/">{t('AppTitle')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">

                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">{t('home')}</Nav.Link>
                        <Nav.Link as={Link} to="/workspace">{t('workspace')}</Nav.Link>
                        <UserWindow isAuth={this.props.isAuthorized} name="all"/>
                    </Nav>

                    <Nav>
                        <NavDropdown alignRight title={t('language')} id="lang-change">
                            <NavDropdown.Item onClick={this.changeLanguage.bind(this, 'en')}>English</NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={this.changeLanguage.bind(this, 'ua')}>Український</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.changeLanguage.bind(this, 'ru')}>Русский</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        isAuthorized: store.authorizedState.isAuthorized,
    };
};

const Header = withTranslation()(LegacyHeader);
export default connect(mapStateToProps)(Header);
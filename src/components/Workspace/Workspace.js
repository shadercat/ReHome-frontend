import React, {Component} from 'react';
import {Nav} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import {Link, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import Hello from "./HelloPage";
import DevelopmentBody from "../InDevelopmentBody/DevelopmentBody";
import {RawPath} from "../../constants/AppPaths";
import DeviceSpace from "./DeviceSpace/DeviceSpace";
import ActionSpace from "./ActionSpace/ActionSpace";
import ResourceGroupsSpace from "./ResourceGroupSpace/ResourseGroupSpace";


class LegacyWorkspace extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired
    };

    render() {
        const {t, match} = this.props;
        return (
            <div className="pt-1">
                <Nav variant="tabs" className="dark-th-color">
                    <Nav.Item>
                        <Nav.Link as={Link} to={`${match.path}${RawPath.devices}`} eventKey="link-1"
                                  className="dark-th-color">
                            {t('devices')}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={`${match.path}${RawPath.resourceGroups}`} eventKey="link-2"
                                  className="dark-th-color">
                            {t('resGroups')}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={`${match.path}${RawPath.statistic}`} eventKey="link-3"
                                  className="dark-th-color">
                            {t('statistic')}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={`${match.path}${RawPath.actions}`} eventKey="link-4"
                                  className="dark-th-color">
                            {t('actions')}
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Switch>
                    <Route path={`${match.path}${RawPath.devices}/:id`}>
                        <DevelopmentBody Description="Device Info"/>
                    </Route>
                    <Route path={`${match.path}${RawPath.devices}`}>
                        <DeviceSpace/>
                    </Route>
                    <Route path={`${match.path}${RawPath.resourceGroups}/:id`}>
                        <DevelopmentBody Description="Resource group body"/>
                    </Route>
                    <Route path={`${match.path}${RawPath.resourceGroups}`}>
                        <ResourceGroupsSpace/>
                    </Route>
                    <Route path={`${match.path}${RawPath.statistic}`}>
                        <DevelopmentBody Description="Statistic"/>
                    </Route>
                    <Route path={`${match.path}${RawPath.actions}`}>
                        <ActionSpace/>
                    </Route>
                    <Route>
                        <Hello/>
                    </Route>
                </Switch>

            </div>
        )
    }
}

const Workspace = withTranslation()(LegacyWorkspace);
export default withRouter(Workspace);
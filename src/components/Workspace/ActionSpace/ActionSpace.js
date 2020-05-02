import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import RegisterDevice from "./ActionsCards/RegisterDevice";
import DeleteDevice from "./ActionsCards/DeleteDevice";
import CreateResourceGroup from "./ActionsCards/CreateResourceGroup";
import DeleteResourceGroup from "./ActionsCards/DeleteResourceGroup";

class LegacyActionSpace extends Component {
    render() {
        const {t} = this.props;
        return (
            <div className="py-4" style={{minHeight: "80vh"}}>
                <div className="container overflow-hidden p-3 bg-light">

                    <Card bg="secondary" text="white" className="mb-3">
                        <Card.Header>{t('actions')}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    {' '}{t('actionsDescription')}{' '}
                                </p>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    <RegisterDevice/>
                    <DeleteDevice/>
                    <CreateResourceGroup/>
                    <DeleteResourceGroup/>
                </div>
            </div>
        );
    }
}

const ActionSpace = withTranslation()(LegacyActionSpace);
export default ActionSpace;
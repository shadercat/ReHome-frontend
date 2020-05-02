import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Accordion, Card, Button} from "react-bootstrap";
import {HashLink as Link} from "react-router-hash-link";
import {AppPaths} from "../../../../constants/AppPaths";


class LegacyDeleteResourceGroup extends Component {
    render() {
        const {t} = this.props;
        return (
            <>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} block variant="outline-danger" size="lg" eventKey={0}>
                                {t('deleteResourceGroup')}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={0}>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {` ${t('resDeleteRedirectionText')} `}
                                    </p>
                                </blockquote>
                                <Card.Link as={Link} to={`${AppPaths.resourceGroups}#top`}>
                                    {t('toResGroups')}
                                </Card.Link>
                            </Card.Body>

                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        )
    }
}

const DeleteResourceGroup = withTranslation()(LegacyDeleteResourceGroup);
export default DeleteResourceGroup;
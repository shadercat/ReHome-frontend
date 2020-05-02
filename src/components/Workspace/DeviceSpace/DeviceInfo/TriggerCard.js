import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";

class LegacyTriggerCard extends Component {
    render() {
        const {trigger, action, t} = this.props;
        return (
            <>
                <Card className="mb-3" border="dark">
                    <Card.Body>
                        <Card.Title>
                            {t(trigger.name)}
                        </Card.Title>
                        <Card.Text>
                            {t(trigger.description)}
                        </Card.Text>

                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Button onClick={() => action(trigger.code)} block variant="outline-success" size="sm">
                                    {t('execute')}
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

const TriggerCard = withTranslation()(LegacyTriggerCard);
export default TriggerCard;
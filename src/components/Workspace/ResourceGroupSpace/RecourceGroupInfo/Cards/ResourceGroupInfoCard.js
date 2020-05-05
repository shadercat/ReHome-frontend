import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

class LegacyResourceGroupInfoCard extends Component {
    render() {
        const {t, info} = this.props;
        return (<>
            <Card className="mb-3" border="info">
                <Card.Header as="h5">{t('resGroup')}</Card.Header>
                <Card.Body>
                    <Card.Title>{info.name}</Card.Title>
                    <Card.Text>
                        {info.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{`id: ${info._id}`}</ListGroupItem>
                </ListGroup>
            </Card>
        </>)
    }
}

const ResourceGroupInfoCard = withTranslation()(LegacyResourceGroupInfoCard);
export default ResourceGroupInfoCard;
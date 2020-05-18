import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

class LegacyAccountCard extends Component {
    render() {
        const {t, data} = this.props;
        return (
            <>
                <Card className="mb-3" border="info">
                    <Card.Header as="h5">{data.name}</Card.Header>
                    <Card.Body>
                        <Card.Title>ID: {data._id}</Card.Title>
                        <Card.Text>{t('registerDateKey', {date: new Date(data.createdAt)})}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{data.email}</ListGroupItem>
                    </ListGroup>
                </Card>
            </>
        )
    }
}

const AccountCard = withTranslation()(LegacyAccountCard);
export default AccountCard;
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

class LegacyDeviceTypePart extends Component {

    render() {
        const {deviceType, t} = this.props;
        return (
            <Card className="mb-3">
                <Card.Header as="h5">{t('deviceType')}</Card.Header>
                <Card.Body>
                    <Card.Title>{deviceType.name}</Card.Title>
                    <Card.Text>
                        {t(deviceType.description)}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{`code: ${deviceType.code}`}</ListGroupItem>
                </ListGroup>
            </Card>
        )
    }
}

const DeviceTypePart = withTranslation()(LegacyDeviceTypePart);
export default DeviceTypePart;
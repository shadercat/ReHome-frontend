import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Badge, Card, ListGroup, ListGroupItem} from "react-bootstrap";

class LegacyDevicePart extends Component {

    render() {
        const {deviceData, t} = this.props;
        return (
            <Card className="mb-3">
                <Card.Header as="h5">{t('device')}</Card.Header>
                <Card.Body>
                    <Card.Title>{deviceData.deviceName}</Card.Title>
                    <Badge variant={(deviceData.deviceStatus.status === "online") ? "success" : "dark"}>
                        {deviceData.deviceStatus.status}
                    </Badge>
                    &nbsp;|&nbsp;
                    <Badge
                        variant={(deviceData.deviceStatus.state === "warning") ? "danger" : "dark"}>
                        {deviceData.deviceStatus.state}
                    </Badge>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{`code: ${deviceData.deviceCode}`}</ListGroupItem>
                </ListGroup>
            </Card>
        )
    }
}

const DevicePart = withTranslation()(LegacyDevicePart);
export default DevicePart;
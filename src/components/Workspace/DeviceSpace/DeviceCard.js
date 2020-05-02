import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types"
import {Badge, Card} from "react-bootstrap";
import {HashLink as Link} from "react-router-hash-link";
import {withRouter} from "react-router";

class LegacyDeviceCard extends Component {
    render() {
        const {item, t, match} = this.props;
        return (
            <>
                <Card border={(item.deviceStatus.status === "offline") ? "dark" :
                    (item.deviceStatus.state === "normal") ? "success" : "dark"}>

                    <Card.Header>{item.deviceName}</Card.Header>

                    <Card.Body style={{padding: "20px 5px"}}>

                        <Card.Title>
                            <Badge variant={(item.deviceStatus.status === "online") ? "success" : "dark"}>
                                {item.deviceStatus.status}
                            </Badge>
                            &nbsp;|&nbsp;
                            <Badge variant={(item.deviceStatus.status === "online") ? "success" : "dark"}>
                                {item.deviceStatus.state}
                            </Badge>
                        </Card.Title>

                        <Card.Text>
                            {`device code: ${item.deviceCode} `}
                        </Card.Text>

                        <Card.Link as={Link} to={`${match.url}/${item.deviceCode}#top`}>{t('moreInfo')}</Card.Link>
                    </Card.Body>

                    <Card.Footer>
                        <small className="text-muted">{item.deviceType.name}</small>
                    </Card.Footer>
                </Card>
            </>
        )
    }
}

LegacyDeviceCard.propTypes = {
    t: PropTypes.func.isRequired
};
const DeviceCard = withTranslation()(LegacyDeviceCard);
export default withRouter(DeviceCard);
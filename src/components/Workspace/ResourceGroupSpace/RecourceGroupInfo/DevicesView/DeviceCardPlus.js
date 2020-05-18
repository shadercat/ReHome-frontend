import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types"
import {Badge, Card, Button} from "react-bootstrap";
import {AppPaths} from "../../../../../constants/AppPaths";
import {withRouter} from "react-router";

class LegacyDeviceCardPlus extends Component {
    constructor(props) {
        super(props);
        this.redirectToDeviceInfo = this.redirectToDeviceInfo.bind(this);
    }

    redirectToDeviceInfo() {
        this.props.history.push(`${AppPaths.devices}/${this.props.item.deviceCode}#page-top`);
    }


    render() {
        const {item, t, deleteHandler} = this.props;
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

                    </Card.Body>

                    <Card.Body>
                        <Card.Link as={Button} variant="outline-info"
                                   onClick={this.redirectToDeviceInfo}>{t('moreInfo')}</Card.Link>
                        <Card.Link as={Button} variant="outline-danger"
                                   onClick={() => deleteHandler(item.deviceCode)}>{t('deleteFromGroupBtn')}</Card.Link>
                    </Card.Body>

                    <Card.Footer>
                        <small className="text-muted">{item.deviceType.name}</small>
                    </Card.Footer>
                </Card>
            </>
        )
    }
}

LegacyDeviceCardPlus.propTypes = {
    t: PropTypes.func.isRequired
};

const DeviceCardPlus = withTranslation()(LegacyDeviceCardPlus);
export default withRouter(DeviceCardPlus);
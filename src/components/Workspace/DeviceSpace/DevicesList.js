import React, {Component} from "react";
import {connect} from 'react-redux';
import {CardColumns} from "react-bootstrap";
import DeviceCard from "./DeviceCard";
import _ from "lodash";

class LegacyDeviceList extends Component {

    render() {
        const {devices} = this.props;
        return (
            <>
                {_.chunk(devices, 3).map((item) =>
                    <CardColumns key={item[0].deviceCode + "col"} className="mb-2">
                        {item.map((item2) =>
                            <DeviceCard
                                key={item2.deviceCode}
                                item={item2}
                            />
                        )}
                    </CardColumns>
                )}
            </>
        )
    }
}


const mapStateToProps = function (store) {
    return {
        devices: store.devicesState.devices
    };
};


const DevicesList = connect(mapStateToProps)(LegacyDeviceList);
export default DevicesList;
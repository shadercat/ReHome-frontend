import React, {Component} from "react";
import {CardColumns} from "react-bootstrap";
import _ from "lodash";
import DeviceCardPlus from "./DeviceCardPlus";

class DeviceGroupList extends Component {

    render() {
        const {devices, deleteHandler} = this.props;
        return (
            <div className="text-center">
                {_.chunk(devices, 3).map((item) =>
                    <CardColumns key={item[0].deviceCode + "col"} className="mb-2">
                        {item.map((item2) =>
                            <DeviceCardPlus
                                key={item2.deviceCode}
                                item={item2}
                                deleteHandler={deleteHandler}
                            />
                        )}
                    </CardColumns>
                )}
            </div>
        )
    }
}

export default DeviceGroupList;
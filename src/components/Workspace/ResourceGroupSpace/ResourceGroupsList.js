import React, {Component} from "react";
import {connect} from 'react-redux';
import {CardColumns} from "react-bootstrap";
import _ from "lodash";
import ResourceGroupCard from "./ResourceGroupCard";

class LegacyResourceGroupsList extends Component {

    render() {
        const {groups} = this.props;
        return (
            <>
                {_.chunk(groups, 3).map((item) =>
                    <CardColumns key={item[0]._id + "col"} className="mb-2">
                        {item.map((item2) =>
                            <ResourceGroupCard
                                key={item2._id}
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
        groups: store.resourceGroupsState.groups
    };
};


const ResourceGroupsList = connect(mapStateToProps)(LegacyResourceGroupsList);
export default ResourceGroupsList;
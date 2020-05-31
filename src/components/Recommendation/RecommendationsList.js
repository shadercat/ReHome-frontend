import React, {Component} from "react";
import _ from "lodash";
import RecommendationCard from "./RecommendationCard";
import {CardColumns} from "react-bootstrap";

class RecommendationsList extends Component {
    render() {
        const {recommendations} = this.props;
        return (<>
            {_.chunk(recommendations, 3).map((item) =>
                <CardColumns key={item[0].createdAt} className="mb-2">
                    {item.map((item2) =>
                        <RecommendationCard
                            key={item2._id}
                            item={item2}
                        />
                    )}
                </CardColumns>
            )}
        </>)
    }
}

export default RecommendationsList;
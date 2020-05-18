import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types"
import {Card} from "react-bootstrap";
import {HashLink as Link} from "react-router-hash-link";
import {withRouter} from "react-router";

class LegacyResourceGroupCard extends Component {
    render() {
        const {item, t, match} = this.props;
        return (
            <>
                <Card border={"dark"}>

                    <Card.Header>{item.name}</Card.Header>

                    <Card.Body style={{padding: "20px 5px"}}>

                        <Card.Text>
                            {item.description}
                        </Card.Text>

                        <Card.Link as={Link} to={`${match.url}/${item._id}#page-top`}>
                            {t('moreInfo')}
                        </Card.Link>

                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{`id: ${item._id} `}</small>
                    </Card.Footer>
                </Card>
            </>
        )
    }
}

LegacyResourceGroupCard.propTypes = {
    t: PropTypes.func.isRequired
};
const ResourceGroupCard = withTranslation()(LegacyResourceGroupCard);
export default withRouter(ResourceGroupCard);
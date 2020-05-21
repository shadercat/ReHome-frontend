import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Card} from "react-bootstrap";
import {HashLink as Link} from "react-router-hash-link";
import {withRouter} from "react-router";
import _ from 'lodash';

class LegacyRecommendationCard extends Component {
    render() {
        const {t, match, item} = this.props;
        return (<>
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                    <Card.Text>
                        {_.padEnd(item.text, 100)}
                    </Card.Text>
                    <Card.Link as={Link} to={`${match.url}/${item._id}#page-top`}>{t('viewDetails')}</Card.Link>
                </Card.Body>
            </Card>
        </>)
    }
}

const RecommendationCard = withTranslation()(LegacyRecommendationCard);
export default withRouter(RecommendationCard);


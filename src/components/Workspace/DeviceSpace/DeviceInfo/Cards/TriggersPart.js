import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Card} from "react-bootstrap";
import TriggerCard from "../TriggerCard";

class LegacyTriggersPart extends Component {
    render() {
        const {t, triggers, handleTrigger} = this.props;
        return (
            <Card>
                <Card.Header as="h5">
                    {t('triggers')}
                </Card.Header>

                <Card.Body>
                    {triggers.map((item) =>
                        <TriggerCard
                            key={item.code}
                            trigger={item}
                            action={handleTrigger}
                        />
                    )}
                </Card.Body>

            </Card>
        )
    }
}

const TriggerPart = withTranslation()(LegacyTriggersPart);
export default TriggerPart;
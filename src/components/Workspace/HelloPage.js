import React, {Component} from "react";
import {Jumbotron} from "react-bootstrap";
import {withTranslation} from "react-i18next";

class LegacyHello extends Component {
    render() {
        const {t} = this.props;
        return (
            <div style={{height: "80vh"}}>
                <Jumbotron>
                    <h1>{t('hello')}</h1>
                    <p>
                        {t('helloDescription')}
                    </p>
                </Jumbotron>
            </div>
        )
    }
}

const Hello = withTranslation()(LegacyHello);
export default Hello;
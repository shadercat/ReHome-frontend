import React, {Component} from 'react';
import {Jumbotron} from "react-bootstrap";
import {withTranslation} from "react-i18next";

class DevelopmentBody extends Component {
    render() {
        const {t, Description} = this.props;
        return (
            <div style={{height: "80vh"}}>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <Jumbotron>
                        <h1>{t('inDevelopment')}</h1>
                        <p>
                            {Description}
                        </p>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}

export default withTranslation()(DevelopmentBody);
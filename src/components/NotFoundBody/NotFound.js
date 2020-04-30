import React, {Component} from 'react';
import {Jumbotron} from "react-bootstrap";
import {withTranslation} from "react-i18next";

class NotFound extends Component {
    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <Jumbotron>
                        <h1>{t('notFound')}</h1>
                        <p>
                            {t('notFoundDescription')}
                        </p>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}

export default withTranslation()(NotFound);
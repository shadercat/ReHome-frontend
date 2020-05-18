import React, {Component} from 'react'
import {withTranslation} from "react-i18next";
import {Button, Jumbotron} from "react-bootstrap";

class LegacyMainPage extends Component {

    render() {
        const {t} = this.props;
        return (
            <div className="container-minimal-height">
                <Jumbotron>
                    <div className="container">
                        <h1 className="display-3">{t('AppTitle')}</h1>
                        <p>
                            {t('appDescription')}
                        </p>
                        <p>
                            <Button variant="info" size="lg">{t('learnMore')}</Button>
                        </p>
                    </div>
                </Jumbotron>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo,
                                tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                                malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p><Button variant={"secondary"}>{t('viewDetails')}</Button></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo,
                                tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                                malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p><Button variant={"secondary"}>{t('viewDetails')}</Button></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                Vestibulum
                                id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor
                                mauris
                                condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                            <p>
                                <Button variant={"secondary"}>{t('viewDetails')}</Button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

const MainPage = withTranslation()(LegacyMainPage);
export default MainPage

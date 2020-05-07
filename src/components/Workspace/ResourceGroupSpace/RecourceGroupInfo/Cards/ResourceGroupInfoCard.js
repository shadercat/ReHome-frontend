import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import ModalTopBtn from "../../../../ModalWindows/ModalTopBtn";
import ModalTop from "../../../../ModalWindows/ModalTop";
import dataActionService from "../../../../../services/dataActionService";
import {withRouter} from "react-router";
import {AppPaths} from "../../../../../constants/AppPaths";

class LegacyResourceGroupInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeletionModal: false,
            showInfoModal: false,
            modalInfo: {
                header: "",
                text: ""
            }
        };

        this.deleteResourceGroup = this.deleteResourceGroup.bind(this);
        this.showDeletionModal = this.showDeletionModal.bind(this);
        this.showInfoModal = this.showInfoModal.bind(this);
    }

    deleteResourceGroup() {
        dataActionService.deleteResourceGroup(this.props.info._id)
            .then(() => {
                this.props.history.push(AppPaths.resourceGroups);
            })
            .catch((error) => {
                this.setState({
                    modalInfo: {
                        header: this.props.t('failOperation'),
                        text: this.props.t(error)
                    },
                    showInfoModal: true
                })
            })
    }

    showInfoModal(state) {
        this.setState({
            showInfoModal: state
        })
    }

    showDeletionModal(state) {
        this.setState({
            showDeletionModal: state
        })
    }

    render() {
        const {t, info} = this.props;
        return (<>
            <ModalTop
                show={this.state.showInfoModal}
                handleClose={() => this.showInfoModal(false)}
                headerText={this.state.modalInfo.header}
                bodyText={this.state.modalInfo.text}
                closeText={t('close')}
            />

            <ModalTopBtn
                show={this.state.showDeletionModal}
                handleClose={() => this.showDeletionModal(false)}
                headerText={t('deleteResGroup')}
                bodyText={t('deleteResGroupText')}
                btnText={t('delete')}
                handleBtn={this.deleteResourceGroup}
                closeText={t('close')}/>

            <Card className="mb-3" border="info">
                <Card.Header as="h5">{t('resGroup')}</Card.Header>
                <Card.Body>
                    <Card.Title>{info.name}</Card.Title>
                    <Card.Text>
                        {info.description}
                    </Card.Text>
                </Card.Body>

                <ListGroup horizontal>
                    <ListGroupItem>
                        {`id: ${info._id}`}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button
                            variant="outline-danger"
                            onClick={() => this.showDeletionModal(true)}>
                            {t('delete')}
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </>)
    }
}

const ResourceGroupInfoCard = withTranslation()(LegacyResourceGroupInfoCard);
export default withRouter(ResourceGroupInfoCard);
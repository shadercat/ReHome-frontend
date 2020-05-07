import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Modal, Button, ListGroup, Pagination} from "react-bootstrap";
import dataAccessService from "../../../../services/dataAccessService";

class LegacyAddToGroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            page: 1,
            groups: [],
        };
        this.downloadGroups = this.downloadGroups.bind(this);
        this.moveToPage = this.moveToPage.bind(this);
    }

    componentDidMount() {
        this.downloadGroups(this.state.page);
    }

    downloadGroups(page) {
        dataAccessService.getResourceGroups(page)
            .then((data) => {
                if (data.length > 0) {
                    this.setState({
                        groups: data,
                        page: page
                    });
                }
            })
    }

    moveToPage(page) {
        if (page > 0) {
            this.downloadGroups(page);
        }
    }

    render() {
        const {t} = this.props;
        return (<>
            <Modal
                onHide={this.props.onHide}
                show={this.props.show}
                size="lg"
                centered>
                <Modal.Header>
                    <Modal.Title>
                        {t('chooseGroup')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{maxHeight: "40vh", minHeight: "25vh", overflowX: "auto"}}>
                        <ListGroup>
                            {
                                this.state.groups.map((item) =>
                                    <ListGroup.Item
                                        key={item._id}
                                        variant="light"
                                        onClick={() => this.props.addToGroup(item._id)}
                                        action>
                                        {item.name}
                                    </ListGroup.Item>)
                            }
                        </ListGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Pagination>
                        <Pagination.Prev onClick={() => this.moveToPage(this.state.page - 1)}/>
                        <Pagination.Item active>
                            {this.state.page}
                        </Pagination.Item>
                        <Pagination.Next onClick={() => this.moveToPage(this.state.page + 1)}/>
                    </Pagination>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>)
    }
}

const AddToGroupModal = withTranslation()(LegacyAddToGroupModal);
export default AddToGroupModal;
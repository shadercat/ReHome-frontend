import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/styles.css';
import {Navbar} from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <Navbar className="bg-teal" variant="dark" sticky="bottom">
                <Navbar.Text>
                    Project ReHome 2020
                </Navbar.Text>
            </Navbar>
        )
    }
}

export default Footer;
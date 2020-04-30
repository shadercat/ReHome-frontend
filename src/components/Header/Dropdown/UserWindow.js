import React, {Component} from "react";
import UnauthorizedWindow from "./WindowState/UnauthorizedWindow";
import AuthorizedWindow from "./WindowState/AuthorizedWindow";

class UserWindow extends Component {
    render() {
        let {isAuth} = this.props;
        return (isAuth) ? (<AuthorizedWindow/>) : (<UnauthorizedWindow/>);
    }
}

export default UserWindow;
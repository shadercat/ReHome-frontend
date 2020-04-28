import React, {Component} from "react";
import Loader from "./Loader";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true
        }
    }

    componentDidMount() {

    }

    render() {
        if (this.state.isFetching) {
            return <Loader/>
        }
        return (
            <>

            </>
        )
    }
}

export default Main;
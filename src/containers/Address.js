import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Address extends React.Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {

    }

    render() {
        return (
            <>
                L'id adresse est : {this.props.match.params.id}
            </>
        );
    }
}


export default withRouter(
    connect()(Address)
    );

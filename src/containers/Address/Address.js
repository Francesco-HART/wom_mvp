import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ADDRESS_CANCEL} from '../../actions/type';
import {findAddressByDocumentId} from '../../actions/address';
import {disconnect} from '../../actions/authentication';

import ActivityIndicator from '../../components/ActivityIndicator';
import Authentication from './Authentication';
import NotFound from './NotFound';
import NoOffers from './NoOffers';
import Gratuities from './Gratuities';
import Contribution from './Contribution';
import Validation from './Validation';
import CouponCreator from './CouponCreator';

class Address extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            selectedOffer: null,
            contribution: null,
            idNotAssociate: false,
            hasValidate: false
        };
        this.offers = [];
    }

    async componentDidMount() {
        const query = await this.props.findAddressByDocumentId(this.props.match.params.id);
        this.offers = [];
        if (query !== null) {
            query.offers.forEach(element => {
                if (element.split(':value:')[1] === "available") {
                    this.offers.push(element.split(':value:')[0]);
                }
            });
        }
        this.setState({
            isLoading: false,
            idNotAssociate: query == null
        });
    }

    selectionOffer = (value) => {
        this.setState({
            selectedOffer: this.offers[value]
        });
    };

    selectionContribution = (value) => {
        this.setState({
            contribution: value
        });
    };

    resetSelectedOffer = () => {
        this.setState({
            selectedOffer: null
        });
    };

    resetContribution = () => {
        this.setState({
            contribution: null
        });
    };

    cancel = () => {
        this.setState({
            isLoading: true,
            selectedOffer: null,
            contribution: null,
            idNotAssociate: false,
            hasValidate: false
        }, () => {
            if (this.props.auth !== null) {
                disconnect();
            }
            this.props.dispatch({type: ADDRESS_CANCEL, payload: null});
            this.props.history.push("/");
        });
    };

    validation = () => {
        this.setState({
            hasValidate: true
        });
    };

    render() {
        /* 
            http://localhost:3000/address/r9KaFF7Omo71TAey7x2H
        */

        if (this.state.isLoading) {
            return <ActivityIndicator />
        }

        if (this.state.idNotAssociate) {
            return <NotFound />;
        }
        
        if (this.offers.length === 0) {
            return <NoOffers addressName={this.props.address.name} />;
        }

        if (this.props.auth === null) {
            return <Authentication addressName={this.props.address.name} />;
        }

        if (this.state.selectedOffer === null) {
            return <Gratuities addressName={this.props.address.name} offers={this.offers} selectionOffer={this.selectionOffer} />;
        }

        if (this.state.contribution === null) {
            return <Contribution addressName={this.props.address.name} selectionContribution={this.selectionContribution} />;
        }
        
        if (!this.state.hasValidate) {
            return <Validation addressName={this.props.address.name} selectedOffer={this.state.selectedOffer} contribution={this.state.contribution} 
                        resetSelectedOffer={this.resetSelectedOffer} resetContribution={this.resetContribution} 
                        validation={this.validation} cancel={this.cancel} 
                    />
        }

        return <CouponCreator addressName={this.props.address.name} selectedOffer={this.state.selectedOffer} contribution={this.state.contribution} cancel={this.cancel}/>;
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(
    connect(mapStateToProps, {findAddressByDocumentId})(Address)
);
        
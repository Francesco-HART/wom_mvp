import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ADDRESS_CANCEL} from '../../actions/type';
import {getUserByPhoneNumber} from "../../actions/authentication";
import {getAddressByDocumentId} from '../../actions/address';


import{sendSms} from '../../actions/sendSms'
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
            hasValidate: false, 
            auth : null
        };
        this.offers = [];
    }

    async componentDidMount() {
        const query = await this.props.getAddressByDocumentId(this.props.match.params.id);
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

    verfiPhoneNumber = async (phonNumber) => {
       const auth = await this.props.getUserByPhoneNumber(phonNumber)
       if(auth){           
           this.setState({auth})
       }
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
            if (this.state.auth !== null) {
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
        const {auth, isLoading, idNotAssociate, selectedOffer, contribution, hasValidate} = this.state
        
        /* 
            http://localhost:3000/address/m1LzI2Z9L5RzVdAyaUtw
        */

        if (isLoading) {
            return <ActivityIndicator />
        }

        if (idNotAssociate) {
            return <NotFound />;
        }
        
        if (this.offers.length === 0) {
            return <NoOffers addressName={this.props.address.name} />;
        }

        if (auth === null) {
            return <Authentication getUserByPhoneNumber={this.verfiPhoneNumber} addressName={this.props.address.name} />;
        }

        if (selectedOffer === null) {
            return <Gratuities addressName={this.props.address.name} offers={this.offers} selectionOffer={this.selectionOffer} />;
        }

        if (contribution === null) {
            return <Contribution addressName={this.props.address.name} selectionContribution={this.selectionContribution} />;
        }
        
        if (!hasValidate) {
            return <Validation sendSms={this.props.sendSms} addressName={this.props.address.name} selectedOffer={selectedOffer} contribution={contribution} 
                        resetSelectedOffer={this.resetSelectedOffer} resetContribution={this.resetContribution} 
                        validation={this.validation} cancel={this.cancel} 
                    />
        }

        return <CouponCreator auth={auth} sendSms={this.props.sendSms} addressName={this.props.address.name} selectedOffer={selectedOffer} contribution={contribution} cancel={this.cancel}/>;
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(
    connect(mapStateToProps, {sendSms , getUserByPhoneNumber,getAddressByDocumentId})(Address)
);
        
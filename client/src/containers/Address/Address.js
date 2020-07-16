import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ADDRESS_CANCEL} from '../../actions/type';
import {getUserByPhoneNumber} from "../../actions/authentication";
import {getAddressByDocumentId} from '../../actions/address';


import{sendSms} from '../../actions/sendSms'

import ActivityIndicator from '../../components/ActivityIndicator';
import Authentication from './Authentication';
import NotFound from './NotFound';
import NoOffers from './NoOffers';
import Gratuities from './Gratuities';
import Contribution from './Contribution';
import Validation from './Validation';
import CouponCreator from './CouponCreator';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    stapeTitle: {
    
     marginBottom : 120
    },
    stapeNumber : {
       
        marginTop : 120
    },
    stapeTitleContribution: {

        marginBottom : 30
       },
       stapeNumberContribution : {
           marginTop : 50
       },
       
    root: {
        width: 300,
        height: '100%',
        margin:10
    },
    mediaContainerContribution : {
        background : 'white',
        height : 250,
        width : 250, 
        borderRadius : 10
    },
    mediaContribution: {
        width : '100%',
        height : '100%',
        paddingTop: '50%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mediaGratuities : {
        width : '100%',
        height : '100%',
        paddingTop: '50%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mediaContainerGratuities : {
        height : 200,
        width : 200, 
        borderRadius : 25 ,
        borderWidth : 5,
        borderColor : 'white'
    }
      });

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

        const { classes } = this.props;
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
            return <NoOffers classes={classes} addressName={this.props.address.name} />;
        }

        if (auth === null) {
            return <Authentication classes={classes} offers={this.offers} getUserByPhoneNumber={this.verfiPhoneNumber} addressName={this.props.address.name} />;
        }

        if (selectedOffer === null) {
            return <Gratuities classes={classes} addressName={this.props.address.name} offers={this.offers} selectionOffer={this.selectionOffer} />;
        }

        if (contribution === null) {
            return <Contribution classes={classes} addressName={this.props.address.name} selectionContribution={this.selectionContribution} />;
        }
        
        if (!hasValidate) {
            return <Validation classes={classes} sendSms={this.props.sendSms} addressName={this.props.address.name} selectedOffer={selectedOffer} contribution={contribution} 
                        resetSelectedOffer={this.resetSelectedOffer} resetContribution={this.resetContribution} 
                        validation={this.validation} cancel={this.cancel} 
                    />
        }

        return <CouponCreator classes={classes} auth={auth} sendSms={this.props.sendSms} addressName={this.props.address.name} selectedOffer={selectedOffer} contribution={contribution} cancel={this.cancel}/>;
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(
    connect(mapStateToProps, {sendSms , getUserByPhoneNumber,getAddressByDocumentId})( withStyles(useStyles)(Address))
);
        
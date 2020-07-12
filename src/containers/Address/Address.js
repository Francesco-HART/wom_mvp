import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Grid, CircularProgress, Typography, Button} from '@material-ui/core';

import {ADDRESS_CANCEL} from '../../actions/type';
import {findAddressByDocumentId, disableAnOffer} from '../../actions/address';
import {disconnect} from '../../actions/authentication';
import LoginPhoneNumber from '../LoginPhoneNumber';
import NotFound from './NotFound';
import NoOffers from './NoOffers';
import Gratuities from './Gratuities';
import SelectedGratuity from './SelectedGratuity';
import WithFriends from './WithFriends';
import SelectedWithFriends from './SelectedWithFriends';

class Address extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectedOffer: null,
            withFriends: null,
            idNotAssociate: false,
            hasValidate: false
        };
        this.offers = [];
    }

    async loadAddress() {
        this.setState({isLoading: true});

        const query = await this.props.findAddressByDocumentId(this.props.match.params.id);
            this.offers = [];
            if (query != null) {
                query.offers.forEach(element => {
                    if (element.split(':value:')[1] === "true") {
                        this.offers.push(element.split(':value:')[0]);
                    }
                });
            }

        this.setState({
            isLoading: false,
            idNotAssociate: query === null,
            selectedOffer: null,
            withFriends: null
        });
    }

    selectionOffer = (value) => {
        this.setState({
            selectedOffer: this.offers[value]
        });
    };

    selectionWithFriends = (value) => {
        this.setState({
            withFriends: value
        });
    };

    resetSelectedOffer = () => {
        this.setState({
            selectedOffer: null
        });
    };

    resetWithFriends = () => {
        this.setState({
            withFriends: null
        });
    };

    cancel = () => {
        this.setState({
            isLoading: true,
            selectedOffer: null,
            withFriends: null,
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

    displayOffers() {
        return this.state.selectedOffer === null ?
            <Gratuities 
                offers={this.offers} 
                selectionOffer={this.selectionOffer} 
            />
            :
            <SelectedGratuity 
                selectedOffer={this.state.selectedOffer}
                resetSelectedOffer={this.resetSelectedOffer} 
                hasValidate={this.state.hasValidate}
            />
            ;
    }

    displayWithFriends() {
        return this.state.withFriends === null ?
            <WithFriends 
                selectionWithFriends={this.selectionWithFriends} 
            />
            :
            <SelectedWithFriends 
                withFriends={this.state.withFriends}
                resetWithFriends={this.resetWithFriends} 
                hasValidate={this.state.hasValidate}
            />
            ;
    }

    displayTicketCreation() {
        if (this.state.hasValidate) {
            disableAnOffer(this.props.address.documentId, this.props.address.offers, this.state.selectedOffer);
            return (
                <Grid container spacing={5}>
                    <Grid item >
                        <Typography variant="h5">
                            Commande validée !
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">
                            Création du coupon...
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CircularProgress/>
                    </Grid>
                </Grid>
            );
        }
    }

    render() {
        /* 
            http://localhost:3000/address/r9KaFF7Omo71TAey7x2H
        */

        if (this.props.address === null || this.props.match.params.id !== this.props.address.documentId) {
            if (!this.state.isLoading) {
                this.loadAddress();
            }
        }

        if (this.state.isLoading) {
            return (
                <Grid container justify='center' spacing={2}>
                    <Grid item>
                        <Grid container justify='center' spacing={2}>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        if (this.state.idNotAssociate) {
            return <NotFound />;
        }
        
        if (this.offers.length === 0) {
            return <NoOffers />;
        }

        if (this.props.auth === null) {
            return (
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.props.addressName}
                        </Typography>
                    </Grid>
                    <Grid container justify='center' spacing={2}>
                        <Grid item>
                            <Grid container justify='center' spacing={2}>
                                <LoginPhoneNumber />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        {this.props.address.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {this.displayOffers()}
                </Grid>
                <Grid item xs={12}>
                    {this.displayWithFriends()}
                </Grid>
                <Grid item xs={12} container spacing={5}>
                    <Grid item>
                        <Button disabled={this.state.selectedOffer === null || this.state.withFriends === null} variant="contained" color="primary" style={{height: 50}} onClick={this.validation}>
                            Valider
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={this.state.hasValidate} variant="contained" color="secondary" style={{height: 50}} onClick={this.cancel}>
                            Annuler
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {this.displayTicketCreation()}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(
    connect(mapStateToProps, {findAddressByDocumentId})(Address)
);
        
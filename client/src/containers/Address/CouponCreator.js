import React from 'react';
import {connect} from 'react-redux';
import {Grid, Typography, Button} from '@material-ui/core';

import {createCoupon} from '../../actions/coupon';
import {isStateOffer, changeStateOffer} from '../../actions/address';

import ActivityIndicator from '../../components/ActivityIndicator';

class CouponCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCouponCreating: null,
            status: null
        };
        this.isAvailable = null;
    }

    async componentDidMount() {
        await this.createCoupon();
    }

    async createCoupon() {
        if (!this.state.isCouponCreating) {
            this.setState({isCouponCreating: true});
            
            const isOfferAvailable = await this.props.isStateOffer(this.props.address.documentId, this.props.selectedOffer, "available");
            if (this.isAvailable === null) {
                // if an error is occured after this step, we know what was the true state of the offer
                this.isAvailable = isOfferAvailable;
            }

            if (this.isOfferAvailable || isOfferAvailable) {

                if (await this.props.changeStateOffer(this.props.address.documentId, this.props.address.offers, this.props.selectedOffer, "reserved")) {
                    const couponDocumentId = await this.props.createCoupon(
                        this.props.address.documentId,
                        this.props.auth.documentId,
                        this.props.selectedOffer, 
                        this.props.contribution);
                        
                        if (couponDocumentId !== null) {
                            this.setState({
                                isCouponCreating: false,
                                couponLink: "http://localhost:3000/coupon/" + couponDocumentId,
                                status: "success"
                            });
                            await this.props.sendSms({to : '+'+this.props.auth.phoneNumber, body : 'Voici le lien vers ton coupon Wom : http://localhost:3000/coupon/' + couponDocumentId})
                            return;
                        }

                        // if the coupon wasn't create and the offer was available, rechange the state of the offer
                        if (this.isAvailable) {
                            await this.props.changeStateOffer(this.props.address.documentId, this.props.address.offers, this.props.selectedOffer, "available");
                        }
                        this.setState({
                            isCouponCreating: false,
                            status: "error"
                        });
                    return;
                }
                this.setState({
                    isCouponCreating: false,
                    status: "error"
                });
                return;
            }
            this.setState({
                isCouponCreating: false,
                status: "notAvailable"
            });
        }
    }

    getCouponCreating() {
        return this.state.isCouponCreating ? 
        <Grid item container justify='center' spacing={5}>
            <Grid item>
                <Typography variant='h5'>
                    Création du coupon ...
                </Typography>
            </Grid>
            <Grid item >
                <ActivityIndicator />
            </Grid>
        </Grid>
        : null;
    }

    getStatus() {
        switch (this.state.status) {
            case "success":
                return (
                    <Grid item container direction="column" alignItems='center' spacing={4}>
                        <Grid item>
                                    <Typography variant='h4' style={{fontFamily : 'Archivo Black'}} gutterBottom>
                                        PROFITE
                                    </Typography>     
                        </Grid>
                        <Grid item>
                            <Typography variant='h5' style={{fontFamily : 'Archivo Black'}} paragraph={true} gutterBottom>
                                A partir de ce moment tu as 01h00 pour réaliser
                                tes gestes de bouche à oreille
                            </Typography>    
                        </Grid>
                        <Grid item>
                            <Typography variant='h5' style={{fontFamily : 'Archivo Black'}}>
                                Tu vas bientôt recevoir un message avec le lien de ton coupon !
                            </Typography>    
                        </Grid>
                    </Grid>
                );
            case "error":
                return (
                    <Grid item container direction="column" spacing={5}>
                        <Grid item>
                            <Grid container justify='center'>
                                <Grid item>
                                    <Button variant="contained" color="primary" style={{height: 50}} onClick={() => this.createCoupon()}>
                                        Ré-essayer
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container justify='center'>
                                <Grid item>
                                    <Typography variant='h5'>
                                        Ou bien contactez l'administration
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            case "notAvailable":
                return (
                    <Grid item container direction="column" spacing={5}>
                        <Grid item>
                            <Grid container justify='center'>
                                <Grid item>
                                    <Typography variant='h5' >
                                        Quelqu'un vient de réserver la même offre 😥
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container justify='center'>
                                <Grid item>
                                    <Button variant="contained" color="primary" style={{height: 50}} onClick={() => this.props.cancel()}>
                                        Home
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                ); 
            default:
                return null;
        }
    }

    render() {
        return (
            <Grid container direction="column" justify="space-between" spacing={3}>
                
                <Grid item>
                    <Grid container justify='center' >
                        <Grid item >
                            <Typography variant='h5' style={{fontFamily : 'Archivo Black'}}>
                                Commande validée !
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                
                { this.getCouponCreating() }

                { this.getStatus() }
                
            </Grid>
        );
    }
}

const mapsStateToProps = ({address}) => {
    return {address};
}

export default connect(mapsStateToProps, {createCoupon, isStateOffer, changeStateOffer})(CouponCreator);
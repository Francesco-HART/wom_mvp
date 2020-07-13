import React from 'react';
import {connect} from 'react-redux';
import {Grid, Typography, CircularProgress} from '@material-ui/core';
import {disableAnOffer} from '../../actions/address';
import {createCoupon} from '../../actions/coupon';

class CouponCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCouponCreating: true
        };
        this.isOfferDeleted = false;
    }

    async componentDidMount() {
        if (!this.isOfferDeleted) {
            this.isOfferDeleted = true;

            const isCouponCreating = await this.props.createCoupon(
                this.props.address.documentId,
                this.props.auth.documentId,
                this.props.selectedOffer, 
                this.props.withFriends);
            
            if (isCouponCreating) {
                const isOfferDeleted = await this.props.disableAnOffer(
                    this.props.address.documentId, 
                    this.props.address.offers, 
                    this.state.selectedOffer);
                if (isOfferDeleted) {
                    this.setState({isCouponCreating: false});
                }
                else  {
                    this.isOfferDeleted = false;
                    this.setState({isCouponCreating: true});
                }
            }
            else {
                this.isOfferDeleted = false;
            }
        }
    }

    render() {
        return this.state.isCouponCreating ?
            (
                <Grid container spacing={5} xs={12}>
                    <Grid item >
                        <Grid container xs={12}>
                            <Grid item>
                                <Typography variant="h5">
                                    Commande validée !
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Grid container xs={12}>
                            <Grid item>
                                <Typography variant="h5">
                                    Création du coupon...
                                </Typography>
                            </Grid>
                            <Grid item>
                                <CircularProgress/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
            :
            (
                <Grid container spacing={5} xs={12}>
                    <Grid item >
                        <Grid container xs={12}>
                            <Grid item>
                                <Typography variant="h5">
                                    Commande validée !
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Grid container xs={12}>
                            <Grid item>
                                <Typography variant="h5">
                                    Coupon créé !
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
    }
}

const mapsStateToProps = (state) => {
    return state;
}

export default connect(mapsStateToProps, {disableAnOffer, createCoupon})(CouponCreator);
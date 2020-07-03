import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {findAddressByDocumentId} from '../actions/address';
import { Grid, Button, Typography, CircularProgress } from '@material-ui/core';

class Address extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            addressId: null,
            idNotAssociate: false
        };
        this.address = null;
    }
    
    async componentDidMount() {
        const query = await findAddressByDocumentId(this.props.match.params.id);
        if (query != null) {
            this.address = query
        }
        this.setState({
            isLoading: false,
            addressId: this.props.match.params.id,
            idNotAssociate: query == null
        });

    }

    render() {
        if (this.state.isLoading) {
            return (
                <Grid container>
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            );
        }

        if (this.state.idNotAssociate) {
            return (
                <Grid container>
                    <Grid item>
                        <Typography>Aucune adresse liée à cet identifiant !</Typography>
                    </Grid>
                </Grid>
            );
        }

        let offers = [];
        if (this.address != null) {
            this.address.offers.forEach(element => {
                if (element.split(':value:')[1] === "true") {
                    offers.push(element.split(':value:')[0]);
                }
            });
        }

        if (offers.length === 0) {
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.address.addressName}
                        </Typography>
                        <Typography variant="h5">
                            Toutes les offres quotidienne offertes. Mais pas de souci, revenez demain !
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        {this.address.addressName}
                    </Typography>
                    <Typography variant="h5">
                        Offres restantes :
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={5}>
                        {offers.map((value) => (
                            <Grid key={value} item >
                                <Button variant="contained" href={"/address/" + this.state.addressId + "/login"} style={{ height: 50 }}>
                                    {value}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Button variant="contained" color="primary" href={"/address/" + this.state.addressId + "/login"} style={{ height: 50 }}>
                            Let's GO
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
          );
    }
}


export default withRouter(
    connect()(Address)
    );

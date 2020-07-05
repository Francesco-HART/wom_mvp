import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {findAddressByDocumentId} from '../actions/address';
import {Grid, Button, Typography, CircularProgress} from '@material-ui/core';

class Address extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            address: null,                          // a foutre dans redux
            selectedOffer: null,                    // a foutre dans redux
            withFriends: null,                      // a foutre dans redux
            isConnected: false,                      // a foutre dans redux
            isConnectedWithInsta: false,            // a foutre dans redux
            idNotAssociate: false,
            hasValidate: false
        };
        this.offers = [];
    }

    async loadAddress() {
        const query = await findAddressByDocumentId(this.props.match.params.id);
        this.setState({
            isLoading: false,
            address: query,                         // a foutre dans redux
            selectedOffer: null,                    // a foutre dans redux
            withFriends: null,                      // a foutre dans redux
            idNotAssociate: query == null
        });

        // faire une action pour envoyer dans redux : l'address, la selectedOffer à null, la withFriend à null
        // ces 5 champs ne sont pas à perdre c'est pourquoi il faut les mettre dans redux
        // si notConnected -> on montre les offres et le btn connexion, 
        // quand on se co sur la page login, on check si on a une address, si oui on est directement redirigé ici (/adress/address.documentId)
        // si selectedOffer == null -> affichage des offres, on click dessus et on save l'offre dans redux, comme ça selectedOffre n'est plus null, la page recharge
        // si selectedOffer != null && withFriends == null -> on affiche l'offre choisi et  de la meme maniere on selectionne seul / avec amis puis save redux, la page recharge
        // si selectedOffer != null && withFriends != null -> si connect à insta, page de validation / sinon page insta
        // une fois inscrit avec insta, on est redirigé vers /address/xsjls et comme on alors nous irons sur la page de validation
        // une fois validé, creation du coupon
        // sur chaque page, on peut choisir 'changer l'offre' ce qui aura pour effet de remettre selectedOffer et withFriends à null, pour recommencer les choix
        // sur chaque page, on peut choisir 'annuler' qui nous remene vers Home

        // faudra du coup changé tous les this.state. ... qui coressespondent
    }

    selectionOffer(value) {
        this.setState({
            selectedOffer: this.offers[value]  // a foutre dans redux
        });
    };

    selectionWithFriends(value) {
        this.setState({
            withFriends: value // a foutre dans redux
        });
    };

    resetSelectedOffer = () => {
        this.setState({
            selectedOffer: null                     // a foutre dans redux
        })
    };

    resetWithFriends = () => {
        this.setState({
            withFriends: null                     // a foutre dans redux
        })
    };

    cancel = () => {
        this.setState({
            isLoading: true,
            address: null,                         // a foutre dans redux
            selectedOffer: null,                   // a foutre dans redux
            withFriends: null                      // a foutre dans redux
        }, () => {
            //this.props.history.push("/");
        });
    };

    validation = () => {
        this.setState({
            hasValidate: true
        })
    };

    render() {

        // si pas d'address
        if (this.state.address === null) {
            this.loadAddress();
            return (
                <Grid container>
                    <Grid item height="100%" justify="center">
                        <CircularProgress/>
                    </Grid>
                </Grid>
            );
        }

        //si en chargement
        if (this.state.isLoading) {
            return (
                <Grid container>
                    <Grid item height="100%" justify="center">
                        <CircularProgress/>
                    </Grid>
                </Grid>
            );
        }

        // si l'adresse entrée n'existe pas
        if (this.state.idNotAssociate) {
            return (
                <Grid container>
                    <Grid item>
                        <Typography>Aucune adresse liée à cet identifiant !</Typography>
                    </Grid>
                </Grid>
            );
        }

        // trouve les offres
        this.offers = [];
        if (this.state.address != null) {
            this.state.address.offers.forEach(element => {
                if (element.split(':value:')[1] === "true") {
                    this.offers.push(element.split(':value:')[0]);
                }
            });
        }

        // si 0 offre
        if (this.offers.length === 0) {
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.state.address.name}
                        </Typography>
                        <Typography variant="h5">
                            Toutes les offres quotidienne offertes. Mais pas de souci, revenez demain !
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        // si pas connecté
        if (!this.state.isConnected) {
            return (
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.state.address.name}
                        </Typography>
                        <Typography variant="h5">
                            Offres restantes :
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={5}>
                            {this.offers.map((value) => (
                                <Grid key={value} item>
                                    <Button variant="contained" style={{height: 50}}>
                                        {value}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Button variant="contained" color="secondary" style={{height: 50}} onClick={this.cancel}>
                                Annuler
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        // si pas d'offre selectionné
        if (this.state.selectedOffer === null) {
            return (
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.state.address.name}
                        </Typography>
                        <Typography variant="h5">
                            Offres restantes :
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={5}>
                            {this.offers.map((value, id) => (
                                <Grid key={id} item>
                                    <Button variant="contained" color="primary" style={{height: 50}}
                                            onClick={() => this.selectionOffer(id)}>
                                        {value}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container>
                            <Button variant="contained" color="secondary" style={{height: 50}} onClick={this.cancel}>
                                Annuler
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        // si pas selectionne ma companie
        if (this.state.withFriends === null) {
            return (
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.state.address.name}
                        </Typography>
                        <Typography variant="h5">
                            Offre choisi :
                        </Typography>
                        <Button variant="contained" style={{height: 50}}>
                            {this.state.selectedOffer}
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Je suis :
                        </Typography>
                        <Grid item container spacing={5}>
                            <Grid item>
                                <Button variant="contained" color="primary" style={{height: 50}}
                                        onClick={() => this.selectionWithFriends("Seul")}>
                                    Seul
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" style={{height: 50}}
                                        onClick={() => this.selectionWithFriends("Avec mes amis")}>
                                    Avec mes amis
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" style={{height: 50}} onClick={this.resetSelectedOffer}>
                            Changer d'offre
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" style={{height: 50}} onClick={this.cancel}>
                            Annuler
                        </Button>
                    </Grid>
                </Grid>
            );
        }

        // si pas connecté à instagram
        if (!this.state.isConnectedWithInsta) {
            //this.props.history.push('/instagram');
            return (
                <Grid item xs={12}>
                    <Grid container>
                        <Button variant="contained" color="primary"
                                onClick={() => this.setState({isConnectedWithInsta: true})} style={{height: 50}}>
                            Je me connecte à instagram
                        </Button>
                    </Grid>
                </Grid>
            );
        }

        // si toutes les conditions sont réunis
        if (!this.state.hasValidate) {
            return (
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            {this.state.address.name}
                        </Typography>
                        <Typography variant="h5">
                            Offre choisi :
                        </Typography>
                        <Button variant="contained" style={{height: 50}}>
                            {this.state.selectedOffer}
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Je suis :
                        </Typography>
                        <Button variant="contained" style={{height: 50}}>
                            {this.state.withFriends}
                        </Button>
                    </Grid>

                    <Grid item container spacing={5}>
                        <Grid item>
                            <Button variant="contained" style={{height: 50}} onClick={this.resetSelectedOffer}>
                                Changer d'offre
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" style={{height: 50}} onClick={this.resetWithFriends}>
                                Je ne suis pas {this.state.withFriends}
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={5}>
                        <Grid item>
                            <Button variant="contained" color="primary" style={{height: 50}} onClick={this.validation}>
                                Valider
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" style={{height: 50}} onClick={this.cancel}>
                                Annuler
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        {this.state.address.name}
                    </Typography>
                    <Typography variant="h5">
                        Offre choisi :
                    </Typography>
                    <Button variant="contained" style={{height: 50}}>
                        {this.state.selectedOffer}
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5">
                        Je suis :
                    </Typography>
                    <Button variant="contained" style={{height: 50}}>
                        {this.state.withFriends}
                    </Button>
                </Grid>

                <Grid item spacing={5}>
                    <Typography variant="h5">
                        Commande validée !
                    </Typography>
                </Grid>

                <Grid item spacing={5}>
                    <Typography variant="h5">
                        Création du coupon...
                    </Typography>
                </Grid>

                <Grid item spacing={5} justify="center">
                    <CircularProgress/>
                </Grid>
            </Grid>
        );
    }
}

// const mapStateToProps = ({auth}) => {
//     return {auth}
// };

export default withRouter(
    connect(/*mapStateToProps*/)(Address)
);
        
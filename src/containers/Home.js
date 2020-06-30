import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import MainFeaturedPost from '../components/homepage/MainFeaturedPost';
import FeaturedPost from '../components/homepage/FeaturedPost';
import Main from '../components/homepage/Main';
import Sidebar from '../components/homepage/Sidebar';
import Footer from "../components/homepage/Footer";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));


const mainFeaturedPost = {

    title: 'Bienvenue aux Womer',
    description: "Womer est une application visant à vous faire découvrir ",
    image: 'https://www.tourdumonde.fr/wordpress/wp-content/uploads/pizza3.jpg',
    imgText: 'main image description',
    linkText: 'Inscrivez-vous...',
};


const sidebar = {
    title: 'About Us',
    description: 'Nous sommes deux jeunes apprenti développeurs de la Coding Factory qui cherchaient une solution agréable et facile contre le gaspillage alimentaire',
    archives: [
        {title: 'Marmiton', url: 'https://www.marmiton.org/'},
        {title: 'Coding Factory', url: 'https://codingfactory.fr/'},
        {title: 'ITESCIA', url: 'https://www.itescia.fr'},
        {title: 'Pia', url: 'https://www.caissedesdepots.fr/investissements-davenir'},
        {title: 'CCI', url: 'http://www.cci-paris-idf.fr/'},
        {title: 'ParisSeine', url: 'http://www.universiteparisseine.fr/'},
        {title: 'M2M Factory', url: 'http://www.m2mfactory.fr/'},
        {title: 'All recipes', url: 'https://www.allrecipes.com/'},
    ],
};

function Home({auth}) {
    const featuredPosts = [
        {
            title: 'Trader',
            date: 'le trader ....',
            description: '',
            image: 'https://images.sweetauthoring.com/recipe/183346_2081.jpg',
            imageText: '',
            redirect: auth ? '/creer/post' : '/connexion'
        },
        {
            title: 'Map',
            date: '',
            description:
                ' la maps...',
            image: 'https://static1.magazine.ribambel.com/articles/7/99/7/@/24751-de-jolies-couleurs-dans-l-assiette-article_media_slide_desktop-2.jpg',
            imageText: '',
            redirect: auth ? '/destockage' : '/connexion'

        },
    ];
    const classes = useStyles();

    return (
        <>
            <Container maxWidth="lg" style={{textAlign: 'justify', textJustify: ' inter-word'}}>
                <main>
                    <MainFeaturedPost auth={auth} post={mainFeaturedPost}/>
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} auth={auth} post={post}/>
                        ))}
                    </Grid>
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Main title="Parcours et pourquoi"/>
                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
                        />
                    </Grid>
                </main>
                <Footer/>
            </Container>
        </>
    );
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(connect(
    mapStateToProps, {}
)(Home))

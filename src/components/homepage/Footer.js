import React from 'react';
import FbPic from "../../img/fb_logo.png"
import InstaPic from "../../img/instagram_logo.png"
import LinkedinPic from "../../img/linkedin_logo.png"
import YoutubePic from "../../img/youtube_logo.png"
import TwitterPic from "../../img/twitter_logo.png"
import FooterCopyright from "./FooterCopyright";
import {Divider, Typography, Grid, CardActionArea} from "@material-ui/core";
import Star from '@material-ui/icons/Star';


/**
 * This class is used to display our whole footer, containing our social networks and copyrights
 */
export default class AboutUs extends React.Component {

    render() {
        const reseaux = [
            {
                name: "Facebook",
                img: FbPic,
                href: "https://www.facebook.com/itescia/",
                title: "acceder à la page facebook d'itescia"
            },
            {
                name: "Instagram",
                img: InstaPic,
                href: "https://www.instagram.com/itescia_officiel/",
                title: "acceder au compte instagram d'itescia"
            },
            {
                name: "Linkedin",
                img: LinkedinPic,
                href: "https://www.linkedin.com/school/itescia/",
                title: "acceder au linkedin d'itescia"
            },
            {
                name: "Youtube",
                img: YoutubePic,
                href: "https://www.youtube.com/channel/UCAhB6gZz4lFwtbXqhzkyVDg",
                title: "acceder au compte youtube d'itescia"
            },
            {
                name: "Twitter",
                img: TwitterPic,
                href: "https://twitter.com/ITESCIA",
                title: "acceder au compte twitter d'itescia"
            }
        ]
        const marks = [];
        for (let i = 1; i < 6; i++) {
            marks.push({value: i, label: <Star/>})
        }
        return (
            <Grid style={{marginTop: 30}}>
                <FooterCopyright  description="Ne gaspillons plus la nourriture !" />
                <Typography>
                    rejoignez nos réseaux
                </Typography>
                <Divider style={{margin: 10}}/>

                <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={6}>
                    {reseaux.map((reseau, index) =>
                        <Grid item key={index}>
                            <CardActionArea component="a" href={reseau.img} target="_blank">
                                <img key={index} src={reseau.img} alt={reseau.name} title={reseau.name} width="40"
                                    height="auto"/>
                            </CardActionArea>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        );
    }

}

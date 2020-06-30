import React from "react";
import L from "leaflet";
import {Marker, Popup, Tooltip} from "react-leaflet";
import {getRemainingDate} from "../../actions/calcul/getDate"
import {
    ListItemAvatar,
    Avatar,
    ListItem,
    Grid,
    List,
    ListItemText,
    Divider,
    Typography,
    IconButton
} from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';


const greyIcon = new L.Icon({
    iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});


const greenIcon = new L.Icon({
    iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});


const goldIcon = new L.Icon({
    iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const redIcon = new L.Icon({
    iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});


const sortIcon = (product, goodIcon) => {

};


/**
 * This function is used to show the destockage map, with icon on destcokage location,
 * and information about one on click like mails or dates
 * @param destockagePost    {array} :   contains destockages posts, with data like user, dates, prices
 * @param auth              {object} :  the current user's data
 * @param inputRef          {} :        input reference
 * @return {*}
 * @constructor
 */
export const DestockageMap = ({destockagePost, auth, inputRef}) => {

    return destockagePost
        .map((d) => d.localization && (
            <Marker
                icon={
                    goldIcon
                    //sortIcon
                }
                style={{backgroundColor: "#2ecc71"}}
                key={d.date_post}
                ref={(el) => inputRef(el, d.informations.login)}
                position={
                    d.localization
                }
            >
                <Tooltip>{d.informations ? d.informations.name : ""}</Tooltip>
                <Popup>
                    <div>

                        <Grid item>
                            <List>
                                <ListItem style={{color: '#ff6f61'}}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <IconButton
                                                style={{background: 'white', textDecoration: 'none'}}
                                                type="Link"
                                                href={`mailto: ${d.informations.email && d.informations.email}`}>
                                                <EmailIcon/>
                                            </IconButton>
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={"Nous Contacter"}
                                        secondary={
                                            <React.Fragment>
                                                <Typography style={{color: 'rgba(0,0,0,0.54)'}}
                                                            align='center'>{d.informations.email && d.informations.email} </Typography>
                                                <Typography style={{color: 'rgba(0,0,0,0.54)'}}
                                                            align='center'>{d.informations.sms && d.informations.sms} </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider/>

                                <ListItem>
                                    <ListItemText
                                        secondary={
                                            <React.Fragment>
                                                <Typography style={{color: '#333'}}
                                                            component="span"
                                                            variant="subtitle1">
                                                    {d.informations.name && d.informations.name}
                                                </Typography>

                                                <Typography
                                                    style={{color: 'rgba(0,0,0,0.54)'}}>{d.informations.description && " - " + d.informations.description + "\n"}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider/>

                                <ListItemText
                                    primary={d.date_start && d.date_end ? getRemainingDate(d.date_end.seconds) : ''}
                                />
                                {d.informations.init_price ?
                                    <Typography
                                        align='left'
                                        style={{color: '#00e676'}}> {d.informations.price && "Le prix de depart êtait de " + d.informations.init_price + "€" + " - " + " Maintenant il est de " + d.informations.price + "€"}
                                    </Typography>
                                    :
                                    <Typography
                                        align='left'
                                        style={{color: '#00e676'}}> {d.informations.price && d.informations.price + "€"}
                                    </Typography>
                                }
                            </List>
                        </Grid>
                    </div>
                </Popup>
            </Marker>
        ));
};

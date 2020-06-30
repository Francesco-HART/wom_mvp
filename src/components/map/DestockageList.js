import React from "react";
import {Divider, IconButton, ListItemSecondaryAction, Typography, List, ListItem, ListItemIcon} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import LocationOffIcon from '@material-ui/icons/LocationOff';
import FastfoodIcon from '@material-ui/icons/Fastfood';


/**
 * This function is used to display a destockage post list
 * @param destockagePost    {array} :       contains destockages posts
 * @param onSelectPost      {function} :    function we have to execute
 * @return {*}
 * @constructor
 */
export const DestockageList = ({destockagePost, onSelectPost}) => {
    if (!destockagePost) return <Typography> Vous n'avez aucun post enregistré</Typography>
    destockagePost.map(b => {
        console.log(b)
    })
    return (
        <>
            <Typography variant='body1' align='center' style={{margin : 10}}> Mes posts</Typography>
            <List style={{width: 240}}>
                {destockagePost.map((d) => (
                    <div key={d.informations.login}>
                        <ListItem button onClick={() => onSelectPost(d)}>
                            <ListItemIcon>
                                <FastfoodIcon/>
                            </ListItemIcon>

                            <Typography>{d.informations.login}</Typography>
                            <ListItemSecondaryAction>
                                {d.localization ?
                                    <IconButton
                                        color={"primary"}
                                        edge="end"
                                        aria-label="comments"
                                    >
                                        <RoomIcon/>
                                    </IconButton>
                                    :
                                    <LocationOffIcon
                                        edge="end"
                                        onClick={() => onSelectPost(d)}
                                        aria-label="comments"
                                    >
                                        <RoomIcon/>
                                    </LocationOffIcon>
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                    </div>
                ))}
            </List>
        </>
    );
};

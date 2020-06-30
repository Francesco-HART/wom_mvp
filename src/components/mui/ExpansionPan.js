import React from "react";
import {ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, Typography, Grid} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


/**
 * This class is used to have an expansion panel with a little adaptable content;
 */
export default class ExpansionPan extends React.Component{
    render(){
        let { title, content, array} = this.props;
        console.log(array);
        return(
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                    {this.props.expand}
                    <Typography>{title}: </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction="column" justify="center">
                        {content}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

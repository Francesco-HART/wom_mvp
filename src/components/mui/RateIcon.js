import React from 'react';
import {Grid} from "@material-ui/core";
import {Star, StarHalf, StarBorder} from '@material-ui/icons';


const arrayRate =(iconType, array, nb, indexAddition)=>{
    for (let i=0; i<nb; i++){
        if (iconType==="star"){array.push(<Star key={i+indexAddition} style={{color: '#f44336'}}/>,)}
        else if (iconType==="half"){array.push(<StarHalf key={i+indexAddition}/>,)}
        else if (iconType==="empty"){array.push(<StarBorder key={i+indexAddition}/>,)}
    }
};


/**
 * This will displayed 5 stars icon, these will be empty or not depending on recipes rates
 * @param rateValue {array}: contains recipe's rates
 * @return {*}
 * @constructor
 */
export const RateIcon =({rateValue})=> {
    let nbStar = Math.floor(rateValue);
    let decimalRate = rateValue % 1 ;
    let nbHalf = 0;
    if (decimalRate>=1/4 && decimalRate<3/4){nbHalf = 1;}
    let nbEmptyStar = 5 - nbStar -nbHalf;

    let ratesArray = [];
    arrayRate("star",   ratesArray, nbStar, 0);
    arrayRate("half",   ratesArray, nbHalf, nbStar);
    arrayRate("empty",  ratesArray, nbEmptyStar, nbStar + nbHalf);

    return(
        <Grid container direction="row" justify="center" alignItems="center" style={{ color : 'rgb(244, 67, 54)'}}>
            {ratesArray.map((icon, index)=> icon)}
        </Grid>
    );

}

import React from "react";
import {Document, Page, StyleSheet, Text, View, Image} from "@react-pdf/renderer";
import cooknSave from "../img/cooknSave.jpg";


/**
 * This function will displayed a pdf containing whole user's grocery list
 * there is ingredients name and quantity. we sum quantity when ingredients are duplicated
 * @param list  {object} : user's grocery list with ingredient's name and quantity
 * @return {*}
 * @constructor
 */
export const PdfGroceryList = ({list}) => {

    let groceryList = [];
    for (let i = 0; i < list.length; i++) {
        // eslint-disable-next-line array-callback-return,no-loop-func
        list[i].ingredients.map((ingredient, i) => {
            let ing = groceryList.find(element => element.name === ingredient.name);
            let quantity = ingredient.quantity !== "" ? parseFloat(ingredient.quantity) : "";

            if (ing) {  // if there is already the ingredient, we sum quantities and delete the first ingredients occurence
                groceryList = groceryList.filter(element => element !== ing) //ing
                if (quantity !== "") {  // case of ingredients without quantities (ex : salt)
                    quantity += parseFloat(ing.quantity);
                }
            }
            groceryList.push({name: ingredient.name, quantity: quantity});
        })
    }

    const styles = StyleSheet.create({
        page: {
            padding: 20,
            //backgroundImage: 'url("'+image+'")',
        },
        section: {
            display: "flex",
            flexDirection: "column",
            margin: 10,
            padding: 10,
            //flexGrow: 1
        },
        title: {
            margin: 5,
            fontSize: "26px",
            fontWeight: 'bold',
            //fontFamily : "Georgia, Times, Helvetica, Verdana",
            color: "#ff6f61",
            textAlign: "center",
        },
        subtitle: {
            marginTop: 15,
            marginBottom: 5,
            fontSize: "22px",
            color: "blue",
        },
        list: {
            marginBottom: 15,
            marginTop: 5,
            marginLeft: 15,
            //border: "2px black groove"
        },
        row: {
            textAlign: "justify",
            fontSize: 14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        leftColumn: {
            //flex:"1",
            width: "20%",
            height: "auto",
            border: "1px red groove",
            paddingLeft: 10,
        },
        rightColumn: {
            //flex:"6",
            width: "80%",
            border: "1px black groove",
            paddingLeft: 10,
        },
        logo: {
            width: "200",
            height: "auto",
            margin: 10,
            textAlign: "center",
            alignSelf: "center"
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.logo} src={cooknSave}/>
                    <Text style={styles.title}>Ma liste de course</Text>
                </View>

                {
                    groceryList ?
                        <View style={styles.list}>{groceryList.map(function (ingredient, i) {
                            return (
                                <View key={i} style={styles.row} minPresenceAhead>
                                    <Text minPresenceAhead style={styles.leftColumn}>{ingredient.quantity}</Text>
                                    <Text minPresenceAhead style={styles.rightColumn}> {ingredient.name} </Text>
                                </View>
                            );
                        })}</View>
                        : ""
                }
            </Page>
        </Document>
    )
};

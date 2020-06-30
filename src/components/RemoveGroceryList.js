import React from 'react';
import {Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {deleteWholeGroceryList, deleteFromGroceryList} from "../actions/updateFirestoreData/userData/deleteWholeGroceryList";
import MaterialTable from "material-table";
import traductions from "../constants/material-table/traductions";
import {LinearProgress, Button} from "@material-ui/core";


/**
 * This class contain a material table, contains user's ingredients from is grocery list,
 * user could delete them from is list whole on one click, or selected which will be deleted
 */
class Ingredients extends React.Component {
    state = {
        userList: {},
        isLoading: true,
        recipesName: []
    };

    componentDidMount = async () => {
        console.log("test Remove grocery list");
        const user = await this.props.auth;
        const userList = user.myList; // {date, ingredients[], recipeName}
        let data = Object.values(userList);
        let recipesName = [];
        for (let i = 0; i < data.length; i++) {
            recipesName.push(data[i].recipeName);
        }
        console.log(recipesName);
        this.setState({userList, isLoading: false, recipesName});
    };
    delFromList = async () => {
        await this.props.deleteWholeGroceryList({userPseudo: this.props.auth.pseudo});
    };


    render() {
        const {isLoading, userList, recipesName} = this.state;
        if (isLoading) return <LinearProgress/>;

        return (

            <>
                <Grid item xs={12} style={{textAlign : 'center'}}>
                    <Button align="center" style={{background : '#ff6f61'}} onClick={this.delFromList}>Effacer ma liste de course</Button>
                </Grid>
                <Grid item xs={12}>
                    <MaterialTable
                        style={{margin: 20}} title={`Ingredients`}
                        localization={traductions} isLoading={isLoading}
                        columns={[{field: "value",},]}
                        data={recipesName.map(recipe => ({value: recipe}))}
                        options={{
                            addRowPosition: "first",
                            draggable: false,
                            actionsColumnIndex: -1,
                            pageSize: 5,
                        }}
                        editable={{
                            onRowDelete: oldData =>
                                new Promise(async (resolve, reject) => {
                                    let element = userList.find(element => element.recipeName === oldData.value);
                                    await this.props.deleteFromGroceryList({
                                        userPseudo: this.props.auth.pseudo,
                                        element: element
                                    });
                                    resolve();
                                })
                        }}
                    />
                </Grid>
            </>
        );
    }
}


const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(
    mapStateToProps,
    {deleteWholeGroceryList, deleteFromGroceryList}
)(Ingredients)






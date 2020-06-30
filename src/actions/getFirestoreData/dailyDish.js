import {db} from "../../Firebase";
import {getDate, getDateToFirestore, getDateFromMilli} from "../calcul/getDate";


/**
 * This function will get dishes randomly from our database. these will be saved in firestore associated with a date.
 * thanks to this, we have each day 3 new dishes shown in DashBoard.
 * @return {function(...[*]=)}
 */
export const dailyDish = () =>  async dispatch => {
    let dailyDish = null;
    let id = "";
    let recipes = [];
    let recipesId = [];
    let haveToAdd = true;
    let haveToUpdateDaily = false;
    try {
        //region => prepare data for future request
        const now = getDateFromMilli(Date.now());
        const dailyRef = db.collection('dailyDish');
        let firestoreDate = new Date(getDateToFirestore(Date.now()));
        await dailyRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                id = doc.id;
            });
        });
        //endregion

        //region => add daily dishes in database if aren't today's recipe
        await dailyRef.get().then(async (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                haveToAdd =false;
                dailyDish = doc.data().recipes;

                haveToUpdateDaily = getDate(doc.data().date.seconds) !== now; // if the date in firestore == today => false
                recipesId=dailyDish
            });
        });

        if (haveToUpdateDaily){
            //region => random recipe selection
            recipesId=[];
            let isRandomEfficient = true;
            let max = 300;
            let nb = 0;
            while (recipesId.length<3) {
                if (isRandomEfficient) {
                    nb = Math.floor(Math.random() * (max));
                }
                else {
                    max=max/2;
                    nb = Math.floor(Math.random() * (max));
                }
                isRandomEfficient = false;
                if (!recipesId.includes(nb)) {
                    await db.collection("recipes").where("id", "==", nb).limit(1).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            recipes.push(doc.data());
                            recipesId.push(doc.data().id);
                            isRandomEfficient = true;
                        });
                    });
                }
            }
            //endregion
            let ref = db.collection("dailyDish").doc(id);
            await ref.update({recipes: recipesId, date: firestoreDate});
        }
        else{
            //seems to be impossible to use getRecipeById
            for (let i=0; i<recipesId.length; i++){
                await db.collection("recipes").where("id", "==", parseInt(recipesId[i])).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        recipes.push(doc.data());
                    });
                });
            }
        }

        if (haveToAdd) {
            const newDish = {
                recipes: recipesId,
                date: firestoreDate
            };
            await dailyRef.add(newDish).then(function (docRef) {
            }).catch(function (error) {})
        }
        //endregion

    } catch (e) {}
    return recipes;
};


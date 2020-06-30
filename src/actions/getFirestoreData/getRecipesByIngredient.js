import {db} from "../../Firebase";


/**
 * This function get recipe depending on user's ingredients,
 * we search recipes with the most ingredients corresponding to user's ingredients
 * @param ingredients   {array} : contains all user's ingredients
 * @return {function(...[*]=array)}
 */
export const getRecipesByIngredient =  (ingredients) => async dispatch=>{
    let recipes = [];
    try {
        let refInit =  db.collection("recipes")
        let ref = db.collection("recipes")
        let limit = ingredients.length;

        for (let i=0; i<ingredients.length; i++) {
            // region => add where condition before searching recipe
            // this could be better if we could search for all possibilities for limit-n:
            // when limit down, we only will see the first of them
            for (let j=0; j<limit; j++) {
                ref = ref.where("ingredientsMap."+ingredients[j]+ ".nameBdd", '==', ingredients[j]);
            }
                    //have to find a way to search with all solution n-1 (Recursive?)
            //endregion

            //let filterIng = [];
             await ref.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if( !recipes.find(element => element.id ===doc.data().id) /*&& doc.data().ingredients.length-ingredients.length<=2*/){
                        recipes.push(doc.data());
                        //let recipeIng = Object.keys(doc.data().ingredientsMap);
                        //filterIng = recipeIng.filter(ingredient => ingredients.includes(ingredient));
                    }
                });
            });

            //we reduce the number of condition this way
            if (recipes.length<10){
                limit--;
                ref = refInit;
            }
        }
    }
    catch (e) {}
    return recipes
};


/**
 * This function get recipe depending on selected ingredients,
 * we search recipes containing all ingredients
 * @param ingredients   {array} : contains all selected ingredients
 * @return              {function(...[*]=array)}
 */
export const getRecipesByIngredientSearch =  (ingredients) => async dispatch => {
    let recipes = [];
    try {
        let ref = db.collection("recipes");

        for (let j=0; j<ingredients.length; j++) {
            ref = ref.where("ingredientsMap."+ingredients[j]+ ".nameBdd", '==', ingredients[j]);
        }
        await ref.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                    recipes.push(doc.data());
            });
        });
    }
    catch (e) {}
    return recipes;
};

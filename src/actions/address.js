import {db} from "../Firebase";
import firebase from 'firebase/app';

export async function addNewAddress(address) {
    await db
    .collection("address")
    .doc()
    .set({
        ...address, isActive: false, position: new firebase.firestore.GeoPoint(0, 0)
    })
    .then(() => {
        console.log("new address was wrote successfully");
    })
    .catch((e) => {
        console.log("Error occured to wrote a new address : " + e.message);
    });
};

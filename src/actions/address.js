import {db} from "../Firebase";
import firebase from 'firebase/app';
import { object } from "firebase-functions/lib/providers/storage";

/**
 * Try to create a new address.
 * @param {string} address The address Name
 * @returns If the address was create and its documentId field was set, return a string corresponding at the documentId. 
 * Else if the address was create but its documentId wasn't set, return null. Endly, return undefined if the address wasn't create.
 */
export async function addNewAddress(address) {
    return await db
    .collection("address")
    .doc()
    .set({
        phoneNumber: address["phoneNumber"],
        addressName: address["addressName"],
        address: address["address"],
        category: address["category"],
        city: address["city"],
        postalCode: address["postalCode"],
        country: address["country"],
        offers: [
            address["offer1"] + ":value:true",
            address["offer2"] + ":value:true"
        ],
        mail: address["mail"],
        password: address["password"],
        webSite: address["webSite"],
        isActive: false,
        position: new firebase.firestore.GeoPoint(0, 0),
        documentId: null
    })
    .then(async () => {
        console.log("New address was wrote successfully !");
        const allDocumentIdFound = await setNewAddressDocumentId(address["addressName"]);
        if (allDocumentIdFound != null) {
            return await db
            .collection("address")
            .doc(allDocumentIdFound[0])
            .update({ documentId: allDocumentIdFound[0] })
            .then(() => {
                console.log("Document id set with success");
                return allDocumentIdFound[0];
            })
            .catch(e => {
                console.log("Error occured to set document id : " + e.message);
                return null;
            });
        }
        console.log("src/actions/address/addNewAddress(address) : Très bizarre d'être ici");
        return null;
    })
    .catch((e) => {
        console.log("Error occured to wrote a new address : " + e.message);
        return undefined;
    });
};

async function setNewAddressDocumentId(addressName) {
    return await db
    .collection("address")
    .where("addressName", "==", addressName)
    .limit(1)
    .get()
    .then(querySnapshot => {
        if (querySnapshot.empty) {
            return null;
        }
        let allDocumentsId = [];
        querySnapshot.forEach((doc) => {
            allDocumentsId.push(doc.$c.path.segments[6]);
        })
        return allDocumentsId;
    })
    .catch(e => {
        console.log("Error occured to find the address '" + addressName + "' : " + e.message);
        return null;
    });
}

export async function findAddressByAddressName(addressName) {
    return await db
    .collection("address")
    .where("addressName", "==", addressName)
    .get()
    .then(querySnapshot => {
        if (querySnapshot.empty) {
            return null;
        }
        let allAddress = [];
        querySnapshot.forEach((doc) => {
            allAddress.push(doc.data());
        })
        return allAddress;
    })
    .catch(e => {
        console.log("Error occured to find the address by name '" + addressName + "' : " + e.message);
        return null;
    });
};

export async function findAddressByDocumentId(documentId) {
    return await db
    .collection("address")
    .doc(documentId)
    .get()
    .then(doc => {
        if (doc.empty) {
            console.log("Doc is empty.");
            return null;
        }
        return doc.data();
    })
    .catch(e => {
        console.log("Error occured to find the address by id '" + documentId + "' : " + e.message);
        return null;
    });
};
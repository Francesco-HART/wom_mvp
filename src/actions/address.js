import {db} from "../Firebase";
import {ADDRESS} from "./type";

/**
 * Try to create a new address.
 * @param {string} address The address Name
 * @returns If the address was create and its field 'documentId' was set, return a string corresponding at the documentId.
 * Else, if the address was create but its documentId wasn't set, return null. Endly, return undefined if the address wasn't create.
 */
export async function addNewAddress(address) {
    return await db
        .collection("address")
        .doc()
        .set({
            phoneNumber: address["phoneNumber"],
            name: address["name"],
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
            isPhoneNumberActive: false,
            isMailActive: false,
            position: new firebase.firestore.GeoPoint(0, 0),
            registerDate: firebase.firestore.FieldValue.serverTimestamp(),
            documentId: null
        })
        .then(async () => {
            console.log("New address was wrote successfully !");
            // if the new user is wrote, we get its id;
            const documentId = await setNewAddressDocumentId(address["name"], address["city"], address["postalCode"], address["country"]);
            if (documentId !== null) {
                return await db
                    .collection("address")
                    .doc(documentId)
                    .update({documentId: documentId})
                    .then(() => {
                        console.log("Document id set with success");
                        return documentId;
                    })
                    .catch(e => {
                        console.log("Error occured to set document id : " + e.message);
                        return null;
                    });
            }
            console.log("src/actions/address/addNewAddress(address) : Très bizarre d'être ici. DocumentId received : " + documentId);
            return null;
        })
        .catch((e) => {
            console.log("Error occured to wrote a new address : " + e.message);
            return undefined;
        });
}

async function setNewAddressDocumentId(addressName, addressCity, addressPostalCode, addressCountry) {
    return await db
        .collection("address")
        .where("name", "==", addressName)
        .where("city", "==", addressCity)
        .where("postalCode", "==", addressPostalCode)
        .where("country", "==", addressCountry)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return null;
            }
            let allDocumentsId = [];
            querySnapshot.forEach((doc) => {
                allDocumentsId.push(doc.$c.path.segments[6]);
            });
            // return the first element cause the array is supposed to have only once.
            return allDocumentsId[0];
        })
        .catch(e => {
            console.log("Error occured to find the address '" + addressName + "' : " + e.message);
            return null;
        });
}

export const findAddressByDocumentId = (documentId) => async dispatch => {
    return await db
        .collection("address")
        .doc(documentId)
        .get()
        .then(doc => {
            if (doc.data() === undefined) {
                console.log("Doc is undefined.");
                dispatch({type: ADDRESS, payload: null});
                return null;
            }
            dispatch({type: ADDRESS, payload: doc.data()});
            return doc.data();
        })
        .catch(e => {
            console.log("Error occured to find the address by id '" + documentId + "' : " + e.message);
            return null;
        });
}

export async function isAddressAlreadyExists(addressName, addressCity, addressPostalCode, addressCountry) {
    return await db
        .collection("address")
        .where("name", "==", addressName)
        .where("city", "==", addressCity)
        .where("postalCode", "==", addressPostalCode)
        .where("country", "==", addressCountry)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return false;
            }
            return true;
        })
        .catch(e => {
            console.log("Error occured to check if an address's already existing. " + e.message);
            return null;
        });
}

export async function resetOffers() {
    const allAddress = await db
        .collection('address')
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("Reset all offer : querySnapshot is empty");
                return [];
            }
            let addressIds = [];
            querySnapshot.forEach(doc => {
                addressIds.push(doc.data());
            });
            return addressIds;
        })
        .catch(e => {
            console.log("Erreur : Can't reset all offers. " + e.message);
            return null;
        });

    if (allAddress === null || allAddress.length === 0) {
        return true;
    }

    allAddress.forEach(async (address) => {
        if (await resetOffersOfOneAddress(address.documentId, address.offers)) {
            console.log("Les offres de " + address.name + " ont été réinitialisé !");
        } else {
            console.log("Les offres de " + address.name + " n'ont pas été réinitialisé !");
        }
    });
}

async function resetOffersOfOneAddress(addressId, addressOffers) {
    return await db
        .collection("address")
        .doc(addressId)
        .update({
            offers: addressOffers.map(offer => offer.split(":value:")[0] + ":value:true")
        })
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.log("Error to reset an offer of an address: " + e.message);
            return false;
        });
}

export async function disableAnOffer(addressId, addressOffers, selectedOffer) {
    return await db
        .collection("address")
        .doc(addressId)
        .update({
            offers: addressOffers.map(offer => offer.split(":value:")[0] + ":value:" + (offer.split(":value:")[0] === selectedOffer ? "false" : offer.split(":value:")[1]))
        })
        .then(() => {
            return true;
        })
        .catch(e => {
            console.log("Error to desable an offer of an address: " + e.message);
            return false;
        })
}

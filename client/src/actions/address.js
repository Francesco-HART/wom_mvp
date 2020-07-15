import {ADDRESS, SHOW_SNACKBAR} from "./type";
import {db} from "../Firebase";
import * as firebase from 'firebase';
import 'firebase/firestore';

export const addNewAddress = (address, authId) => async dispatch => {
    let phone = address["phoneNumber"];
    while (phone.includes(" ")) {
        phone = phone.replace(" ", "");
    }
    return await db
        .collection("address")
        .doc()
        .set({
            phoneNumber: phone,
            name: address["name"],
            address: address["address"],
            category: address["category"],
            city: address["city"],
            postalCode: address["postalCode"],
            country: address["country"],
            offers: [
                address["offer1"] + ":value:available",
                address["offer2"] + ":value:available"
            ],
            mail: address["mail"],
            webSite: address["webSite"],
            isMailActive: false,
            password: address["password"],
            validationCode: address["validationCode"],
            position: new firebase.firestore.GeoPoint(0, 0),
            registerDate: firebase.firestore.FieldValue.serverTimestamp(),
            documentId: null,
            womerId: authId
        })
        .then(async () => {
            const documentId = await getAddressDocumentId(address["name"], address["city"], address["postalCode"], address["country"]);
            if (documentId === null) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Adresse créée. Impossible de trouver l'adresse !", variant: "error"}
                });
                return null;
            }
            else {
                return await db
                    .collection("address")
                    .doc(documentId)
                    .update({documentId: documentId})
                    .then(() => {
                        dispatch({
                            type: SHOW_SNACKBAR,
                            payload: {txt: "L'adresse a été créé avec succès !", variant: "success"}
                        });
                        return documentId;
                    })
                    .catch(e => {
                        dispatch({
                            type: SHOW_SNACKBAR,
                            payload: {txt: "Adresse créée. Erreur lors de l'écriture du documentID de l'adresse : '" + documentId + "' !\n" + e.message, variant: "error"}
                        });
                        return null;
                    });
            }
        })
        .catch((e) => {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Impossible de créer l'adresse !\n" + e.message, variant: "error"}
            });
            return null;
        });
}

async function getAddressDocumentId(addressName, addressCity, addressPostalCode, addressCountry) {
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
            return null;
        });
}

export const getAddressByDocumentId = (documentId) => async dispatch => {
    return await db
        .collection("address")
        .doc(documentId)
        .get()
        .then(doc => {
            if (doc.data() === undefined) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Aucune adresse associée à cet identifiant ! ", variant: "error"}
                });
                dispatch({type: ADDRESS, payload: null});
                return null;
            }
            dispatch({type: ADDRESS, payload: doc.data()});
            return doc.data();
        })
        .catch(e => {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Impossible de trouver l'adresse par l'identifiant '" + documentId + "'.\n" + e.message, variant: "error"}
            });
            dispatch({type: ADDRESS, payload: null});
            return null;
        });
}

export const isAddressAlreadyExists = (addressName, addressCity, addressPostalCode, addressCountry) => async dispatch => {
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
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Impossible de vérifier si l'adresse existe déjà.\n" + e.message, variant: "error"}
            });
            return null;
        });
}

export const resetOffers = () => async dispatch => {
    const allAddress = await db
        .collection('address')
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Aucune adresse trouvée ! Aucune adresse réinitialisé.", variant: "error"}
                });
                return [];
            }
            let addressIds = [];
            querySnapshot.forEach(doc => {
                addressIds.push(doc.data());
            });
            return addressIds;
        })
        .catch(e => {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Impossible de réinitialiser les offres ! Aucune adresse réinitialisée.\n" + e.message, variant: "error"}
            });
            return null;
        });

    if (allAddress === null || allAddress.length === 0) {
        return false;
    }

    let countAddressReseted = 0;
    for (let i = 0; i < allAddress.length; i++) {
        const hasReset = await resetOffersOfOneAddress(allAddress[i].documentId, allAddress[i].offers);
        if (hasReset) {
            countAddressReseted++;
        }
    }

    if (countAddressReseted !== allAddress.length) {
        dispatch({
            type: SHOW_SNACKBAR,
            payload: {txt: "Adresse réinitialisée : " + countAddressReseted + " / " + allAddress.length + ".", variant: "error"}
        });
        return false;
    }
    dispatch({
        type: SHOW_SNACKBAR,
        payload: {txt: "Toutes les adresse ont été réinitialisée !", variant: "success"}
    });
    return true;
}

async function resetOffersOfOneAddress(addressId, addressOffers) {
    return await db
        .collection("address")
        .doc(addressId)
        .update({
            offers: addressOffers.map(offer => offer.split(":value:")[0] + ":value:available")
        })
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.log("resetOffersOfOneAddress err: " + e.message);
            return false;
        });
}

export const changeStateOffer = (addressId, addressOffers, selectedOffer, newState) => async dispatch => {
    return await db
        .collection("address")
        .doc(addressId)
        .update({
            offers: addressOffers.map(offer => offer.split(":value:")[0] + ":value:" + (offer.split(":value:")[0] === selectedOffer ? newState : offer.split(":value:")[1]))
        })
        .then(() => {
            return true;
        })
        .catch(e => {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Impossible de changer l'état de l'offre !\n" + e.message, variant: "error"}
            });
            return false;
        });
}

export const isStateOffer = (addressId, offer, state) => async dispatch => {
    return await db
        .collection("address")
        .doc(addressId)
        .get()
        .then(doc => {
            const address = doc.data(); 
            if (address === undefined) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Aucune adresse associée à cet identifiant ! ", variant: "error"}
                });
                return null;
            }
            for (let i = 0; i < address.offers.length; i++) {
                if (address.offers[i].split(':value:')[0] === offer) {
                    return address.offers[i].split(':value:')[1] === state; 
                }
            }
            return false;
        })
        .catch(err => {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Impossible de vérifier l'état de l'offre !\n" + err.message, variant: "error"}
            });
            return null;
        });
}

import {SHOW_SNACKBAR} from "./type";
import {db} from "../Firebase";
import * as firebase from 'firebase';
import 'firebase/firestore';

export const createCoupon = (addressId, womerId, selectedOffer, withFriends) => async dispatch => {
    const creationDate = firebase.firestore.FieldValue.serverTimestamp();
    return await db
        .collection("coupons")
        .doc()
        .set({
            addressId: addressId,
            womerId: womerId,
            selectedOffer: selectedOffer,
            withFriends: withFriends,
            creationDate: creationDate,
            documentId: null
        })
        .then(async () => {
            const documentId = await getCouponDocumentId(addressId, womerId, creationDate);
            if (documentId === null) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Coupon créé. Impossible de trouver le coupon !", variant: "error"}
                });
                return false;
            }
            else {
                return await db
                    .collection("coupons")
                    .doc(documentId)
                    .update({documentId: documentId})
                    .then(() => {
                        return true;
                    })
                    .catch(e => {
                        dispatch({
                            type: SHOW_SNACKBAR,
                            payload: {txt: "Coupon créé. Erreur lors de l'écriture du documentID du coupon : '" + documentId + "' !\n" + e.message, variant: "error"}
                        });
                        return false;
                    });
            }
        })
        .catch((e) => {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Impossible de créer le coupon !\n" + e.message, variant: "error"}
            });
            return false;
        });
}

async function getCouponDocumentId(addressId, womerId, creationDate) {
    return await db
        .collection("coupons")
        .where("addressId", "==", addressId)
        .where("womerId", "==", womerId)
        .where("creationDate", "==", creationDate)
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

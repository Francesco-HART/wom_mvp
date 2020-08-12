import {SHOW_SNACKBAR} from "./type";
import {db} from "../Firebase";
import * as firebase from 'firebase';
import 'firebase/firestore';

export const createCoupon = (addressId, womerId, selectedOffer, contribution, idInsta) => async dispatch => {
    const tmpId = makeid(30);
    return await db
        .collection("coupons")
        .doc()
        .set({
                 addressId: addressId,
                 womerId: womerId,
                 selectedOffer: selectedOffer,
                 contribution: contribution,
                 creationDate: firebase.firestore.FieldValue.serverTimestamp(),
                 documentId: null,
                 tmpId: tmpId,
                 idInsta: idInsta
             })
        .then(async () => {
            const documentId = await getCouponByTmpId(tmpId);
            if (documentId === null) {
                dispatch({
                             type: SHOW_SNACKBAR,
                             payload: {txt: "Coupon créé. Impossible de trouver le coupon !", variant: "error"}
                         });
                return null;
            } else {
                return await db
                    .collection("coupons")
                    .doc(documentId)
                    .update({documentId: documentId})
                    .then(() => {
                        dispatch({
                                     type: SHOW_SNACKBAR,
                                     payload: {txt: "Coupon créé avec succès !", variant: "success"}
                                 });
                        return documentId;
                    })
                    .catch(e => {
                        dispatch({
                                     type: SHOW_SNACKBAR,
                                     payload: {
                                         txt: "Coupon créé. Erreur lors de l'écriture du documentID du coupon : '" + documentId + "' !\n" + e.message,
                                         variant: "error"
                                     }
                                 });
                        return null;
                    });
            }
        })
        .catch((e) => {
            dispatch({
                         type: SHOW_SNACKBAR,
                         payload: {txt: "Impossible de créer le coupon !\n" + e.message, variant: "error"}
                     });
            return null;
        });
}

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function getCouponByTmpId(tmpId) {
    return await db
        .collection("coupons")
        .where("tmpId", "==", tmpId)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return null;
            }
            let allDocumentsId = [];
            querySnapshot.forEach((doc) => {
                allDocumentsId.push(doc.$c.path.segments[ 6 ]);
            });
            // return the first element cause the array is supposed to have only once.
            return allDocumentsId[ 0 ];
        })
        .catch(e => {
            return null;
        });
}

export const getCouponByDocumentId = (documentId) => async dispatch => {
    return await db
        .collection("coupons")
        .doc(documentId)
        .get()
        .then(doc => {
            if (doc.data() === undefined) {
                dispatch({
                             type: SHOW_SNACKBAR,
                             payload: {txt: "Aucun coupon associé à cet identifiant ! ", variant: "error"}
                         });
                return null;
            }
            return doc.data();
        })
        .catch(e => {
            dispatch({
                         type: SHOW_SNACKBAR,
                         payload: {
                             txt: "Impossible de récupérer le coupoun par l'id '" + documentId + "'.\n" + e.message,
                             variant: "error"
                         }
                     });
            return null;
        });
}
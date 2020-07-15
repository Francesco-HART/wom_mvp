import functions from 'firebase-functions'
import admin from 'firebase-admin';
import sgMail from '@sendgrid/mail'

admin.initializeApp(functions.config().firebase)
sgMail.setApiKey()
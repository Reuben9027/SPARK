import admin from 'firebase-admin'

let app
let adminAuth
let adminDb

export function getFirebaseAdmin() {
  if (!app) {
    const config = useRuntimeConfig()
    const serviceAccount = JSON.parse(config.FIREBASE_ADMIN_CREDENTIALS || '{}')

    if (!admin.apps.length) {
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    } else {
      app = admin.app()
    }

    adminAuth = admin.auth()
    adminDb = admin.firestore()
  }

  return { adminAuth, adminDb }
}

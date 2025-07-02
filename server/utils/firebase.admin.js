import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

let app
let adminAuth
let adminDb

export function getFirebaseAdmin() {
  if (!app) {
    const config = useRuntimeConfig()
    const serviceAccount = JSON.parse(config.FIREBASE_ADMIN_CREDENTIALS || '{}')

    try {
      app = getApp('admin');  
    } catch (error) {
      app = initializeApp({
        credential: cert(serviceAccount),
        name: 'admin'
      })
    }

    adminAuth = getAuth()
    adminDb = getFirestore()
  }

  return { adminAuth, adminDb }
}

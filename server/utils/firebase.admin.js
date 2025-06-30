import admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS || '{}')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://your-project-id.firebaseio.com"
  })
}

const adminDb = admin.firestore()
const adminAuth = admin.auth()

// const provider = new GoogleAuthProvider()

export { adminDb, adminAuth }

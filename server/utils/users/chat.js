import { getFirebaseAdmin} from '@/server/utils/firebase.admin'
import {sortByTimestamp } from '@/server/utils/sortings/sortings'

export async function getProjectChatlogs(idToken, projectId) {
  if (!idToken || !projectId) {
    throw new Error('Missing ID token')
  }
  const {adminAuth , adminDb} = getFirebaseAdmin();

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  const chatlogs = await adminDb
    .collection('users')
    .doc(uid)
    .collection('projects')
    .doc(projectId)
    .collection('chats')
    .doc('AI')
    .collection('chatlogs')
    .get();

  const chats = sortByTimestamp(
    chatlogs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })),
    'asc' // or 'desc'
  )

  return chats
}


export async function sendProjectChat(idToken, projectId, message) {
  if (!idToken || !message) {
    throw new Error('Missing required data')
  }

  const {adminAuth , adminDb} = getFirebaseAdmin();

  // if(!projectId ){
  //   projectId = '_chatbot'
  // }

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  const chatRef = adminDb
    .collection('users')
    .doc(uid)
    .collection('projects')
    .doc(projectId)
    .collection('chats')
    .doc('AI')
    .collection('chatlogs')

  const chatDoc = {
    role: 'user',
    content: message.content || '',
    timestamp: message.timestamp || Date.now()
  }

  await chatRef.add(chatDoc)

  return { success: true, added: chatDoc }
}

export async function clearProjectChat(idToken, projectId) {
  if (!idToken || !projectId) {
    throw new Error('Missing required data')
  }

  const {adminAuth , adminDb} = getFirebaseAdmin();
  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  const chatRef = adminDb
    .collection('users')
    .doc(uid)
    .collection('projects')
    .doc(projectId)
    .collection('chats')
    .doc('AI')
    .collection('chatlogs')

  const snapshot = await chatRef.get()
  
  const batch = adminDb.batch()

  snapshot.forEach(doc => {
    batch.delete(doc.ref)
  })

  await batch.commit()

  return { success: true, clearedCount: snapshot.size }
}



// export async function getProjectChatlogsSorted(idToken, projectId) {
//   if (!idToken || !projectId) {
//     throw new Error('Missing ID token')
//   }
//   const decoded = await adminAuth.verifyIdToken(idToken)
//   const uid = decoded.uid

//   const projectsSnap = await adminDb
//     .collection('users')
//     .doc(uid)
//     .collection('projects')
//     .doc(projectId)
//     .collection('chats')
//     .doc('AI')
//     .collection('chatlogs')
//     .get();

//   const projects = sortByTimestamp(
//     projectsSnap.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     })),
//     'asc' // or 'desc'
//   )

//   return projects
// }



// export async function sendProjectChat(idToken, projectId, message) {
//   if (!idToken || !projectId || !message) {
//     throw new Error('Missing required data')
//   }

//   const decoded = await adminAuth.verifyIdToken(idToken)
//   const uid = decoded.uid

//   const chatRef = adminDb
//     .collection('users')
//     .doc(uid)
//     .collection('projects')
//     .doc(projectId)
//     .collection('chats')
//     .doc('AI')
//     .collection('chatlogs')

//   const chatDoc = {
//     role: message.role || 'user',
//     content: message.content || '',
//     timestamp: message.timestamp || Date.now()
//   }

//   await chatRef.add(chatDoc)

//   return { success: true, added: chatDoc }
// }


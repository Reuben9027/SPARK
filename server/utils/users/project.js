import { getFirebaseAdmin } from '@/server/utils/firebase.admin'
// import project from '~/server/api/users/project'

export async function getUsersAllProject(idToken) {
  if (!idToken) {
    throw new Error('Missing ID token')
  }

  const {adminAuth , adminDb} = getFirebaseAdmin();

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  // Get all projects from user's subcollection
  const projectsSnap = await adminDb
    .collection('users')
    .doc(uid)
    .collection('projects')
    .get()

  const projects = projectsSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return projects
}



export async function getUserProject(idToken, projectId) {

    if (!idToken || !projectId) {
        throw new Error('Missing parameters')
    }
    const {adminAuth , adminDb} = getFirebaseAdmin();

    const decoded = await adminAuth.verifyIdToken(idToken)
    const uid = decoded.uid

    const projectRef = adminDb
        .collection('users')
        .doc(uid)
        .collection('projects')
        .doc(projectId)

    const projectSnap = await projectRef.get()

    // 3. Handle missing project
    if (!projectSnap.exists) {
        throw new Error('Project not found or you do not have access')
    }

    return {
        id: projectSnap.id,
        ...projectSnap.data()
    }
}


export async function initUserProject(idToken, metadata = {}) {
  if (!idToken) {
    throw new Error('Missing parameters')
  }
  const {adminAuth , adminDb} = getFirebaseAdmin();

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  const projectRef = adminDb
    .collection('users')
    .doc(uid)
    .collection('projects')
    .doc()

  const projectSnap = await projectRef.get()

  if (!projectSnap.exists) {
    // Create project document with optional metadata
    await projectRef.set({
      title: metadata.title || 'Untitled Project',
      description: metadata.description || '',
      createdAt: Date.now()
    })

    // Initialize empty doc in each subcollection
    

    await projectRef.collection('chats').doc('AI').collection('chatlogs').doc('_init').set({
        role: 'system',
        content: 'you are a great assistant'
    });

    await projectRef.collection('chats').doc('AI').collection('contexts').doc('first-prompt').set(
        metadata.first_prompt? {content: metadata.first_prompt }: {content: "you are helping me build my project"});


    const collections = ['tasks', 'schedules']
    for (const col of collections) {
      await projectRef.collection(col).doc('_init').set({
        initialized: true,
        timestamp: Date.now()
      })
    }
  }

  // Return the project (existing or newly created)
  const finalSnap = await projectRef.get()
  return {
    id: finalSnap.id,
    ...finalSnap.data()
  }
}


export async function setFirstPrompt(idToken, projectId, prompt) {
  if (!idToken || !projectId) {
    throw new Error('Missing parameters')
  }
  const {adminAuth , adminDb} = getFirebaseAdmin();

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  const projectRef = adminDb
    .collection('users')
    .doc(uid)
    .collection('projects')
    .doc(projectId)

  const projectSnap = await projectRef.get()
  if (!projectSnap.exists) {
    throw new Error('Project does not exist')
  }

  // Ensure prompt is a valid object with content
  
  const content = prompt || "you are helping me build my project."
  

  await projectRef
    .collection('chats')
    .doc('AI')
    .collection('contexts')
    .doc('first-prompt')
    .set({content}, {merge : true})

  const finalSnap = await projectRef.get()
  return {
    id: finalSnap.id,
    ...finalSnap.data()
  }
}


export async function updateProjectMetadata( idToken , projectId, metadata){
  try {
    // const { idToken, projectId, metadata } = body

    if (!idToken || !projectId || !metadata) {
      throw new Error('Missing parameters')
    }
    const {adminAuth , adminDb} = getFirebaseAdmin();

    const decoded = await adminAuth.verifyIdToken(idToken)
    const uid = decoded.uid

    const projectRef = adminDb
      .collection('users')
      .doc(uid)
      .collection('projects')
      .doc(projectId)

    const projectSnap = await projectRef.get()
    if (!projectSnap.exists) {
      throw new Error('Project not found or access denied')
    }

    await projectRef.set(
      {
        ...metadata,
        updatedAt: Date.now()
      },
      { merge: true } // merge allows partial updates
    )

    const updatedSnap = await projectRef.get()
    return {
      id: updatedSnap.id,
      ...updatedSnap.data()
    }
  } catch (err) {
    console.error('Failed to update project metadata:', err)
    return {
      success: false,
      error: err.message
    }
  }
}

export async function getFirstPrompt(idToken, projectId) {
  if (!idToken || !projectId) {
    throw new Error('Missing parameters')
  }
  const {adminAuth , adminDb} = getFirebaseAdmin();

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  // const userRef = adminDb.collection('users').doc(uid)
  // const userSnap = await userRef.get()
  // if (!userSnap.exists) {
  //   throw new Error('User not found')
  // }

  // const projectRef = userRef.collection('projects').doc(projectId)
  // const projectSnap = await projectRef.get()
  // if (!projectSnap.exists) {
  //   throw new Error('Project does not exist')
  // }

  const contextRef = adminDb.collection('users')
    .doc(uid)
    .collection('projects')
    .doc(projectId)
    .collection('chats')
    .doc('AI')
    .collection('contexts')
    .doc('first-prompt')

  const promptSnap = await contextRef.get()
  if (!promptSnap.exists) {
    return { content: 'No prompt found.' }
  }

  return promptSnap.data() // { content: "..." }
}

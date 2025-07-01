import { updateProjectMetadata } from '~/server/utils/users/project'


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { idToken, projectId ,metadata } = body

    const check = await getUserProject(idToken, projectId);

    const data = await updateProjectMetadata(idToken,projectId, metadata);

    return { success: true, data }
  } catch (err) {
    console.error('Post failed:', err)
    return { success: false, error: 'Failed to post: ' + err.message }  
  }
})

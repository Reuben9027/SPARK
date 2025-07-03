import { deleteUserProject } from '~/server/utils/users/project'


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { idToken , projectId} = body

    await deleteUserProject(idToken, projectId);

    return { success: true}
  } catch (err) {
    console.error('Post failed:', err)
    return { success: false, error: 'Failed to post: ' + err.message }  
  }
})

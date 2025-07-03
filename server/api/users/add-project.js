import { initUserProject } from '~/server/utils/users/project'


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { idToken , metadata} = body

    const data = await initUserProject(idToken, metadata);

    return { success: true, data }
  } catch (err) {
    console.error('Post failed:', err)
    return { success: false, error: 'Failed to post: ' + err.message }  
  }
})

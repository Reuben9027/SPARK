import { getUsersAllProject } from '~/server/utils/users/project'


export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { idToken} = body

    const data = await getUsersAllProject(idToken);

    return { success: true, data }
  } catch (err) {
    console.error('Post failed:', err)
    return { success: false, error: 'Failed to post: ' + err.message }  
  }
})

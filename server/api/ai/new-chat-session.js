import { callAI } from '~/server/utils/ai/chat'
import { clearProjectChat} from '~/server/utils/users/chat'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { idToken, projectId } = body

    if(projectId != '_chatbot'){
        return { error: 'not avialable for now' }    
    }
    
    const chat = await clearProjectChat(idToken, projectId)




    return { success: true, chat,}
  } catch (err) {
    console.error('Post failed:', err)
    return { error: 'Failed to post: ' + err.message }
  }
})

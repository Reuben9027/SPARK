import { callAI } from '~/server/utils/ai/chat'
import { sendProjectChat, getProjectChatlogs } from '~/server/utils/users/chat'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { idToken, projectId, message } = body



    const chat = await sendProjectChat(idToken, projectId,message )

    const chatlogs = await getProjectChatlogs(idToken, projectId);

    const ai = await callAI(idToken, chatlogs);


    const reply ={
        role: 'assistant',
        content: ai.reply.replace(/<think>.*?<\/think>/gs, '')
    }
    const store_reply = await sendProjectChat(idToken, projectId, reply );

    console.log(ai);

    return { success: true, chat, reply }
  } catch (err) {
    console.error('Post failed:', err)
    return { error: 'Failed to post: ' + err.message }
  }
})

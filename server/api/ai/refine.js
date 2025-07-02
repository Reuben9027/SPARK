import { refineIdea } from '~/server/utils/ai/chat'
import { getFirstPrompt } from '~/server/utils/users/project'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { idToken, projectId, messages } = body


    const first = await getFirstPrompt(idToken, projectId);


    const template = [
        {
            role: 'system',
            content: `You are going to reply in json.
             You are going to refine a project idea the given 
             ideas by giving you a json file and answering in
              json overriding the previous values. If there is 
              empty generate an idea. also use this as a reference ${first.content}`
        },
        {
            role: 'user',
            content: JSON.stringify(messages)
        }
    ]

    //console.log(template)
    const chat = await refineIdea(idToken,template )
    
    const reply = JSON.parse(chat.reply);

    //console.log(reply);
    //console.log(chat.reply);

    return { success: true, reply }
  } catch (err) {
    console.error('Post failed:', err)
    return { error: 'Failed to post: ' + err.message }
  }
})

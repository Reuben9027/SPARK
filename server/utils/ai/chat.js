// utils/aiChat.js
import { readBody } from 'h3'

const model = "gpt-3.5-turbo"
// const model = "deepseek-r1:8b"

const api_link = 'https://api.openai.com/v1/chat/completions'
// const api_link = 'https://on-colt-17.rshare.io/api/chat/completions'  

const apiKey =process.env.OPENAI_API_KEY;
// const apiKey =process.env.LOCAL_AI_KEY;

export async function callAI(idToken,messages) {
  // const userMessage = body.message

  if (!messages|| !idToken) {
    return { error: 'Message is required' }
  }

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  try {
    console.log("called");
    const response = await fetch(api_link, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages:messages,
        // options: {
        //   thinking: false, // This disables the thinking mode
        // },
        // thinking: false,
        temperature: 0.7,
      }),
    })
    console.log("HELLOs");

    const data = await response.json()

    if (!response.ok) {
      console.error('[OpenAI Error]', data)
      return { error: data.error?.message || 'Failed to call OpenAI' }
    }

    return {
      reply: data.choices?.[0]?.message?.content || '[No reply]',
      usage: data.usage, // Optional: includes token usage
    }
  } catch (err) {
    console.error('[Server Error]', err)
    return { error: 'Server error' }
  }
}


export async function listener(idToken, message){
    
  if (!message|| !idToken) {
    return { error: 'Message is required' }
  }

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid
  try {
    console.log("called");
    const response = await fetch(api_link, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages:[
            {
                role: 'system',
                content: `You will check a json file and read the contents of it, 
                you can modify the values and make sure it still a valid json and dont
                change the value of parameter "id" in it. You will reply in json format and the modified
                version of the given json is inside 'data'. Your goal is to read the datas and suggest a improved version of it by doing the data.
                the datas can be a schedules, tasks, or to do list for a project. if you think that the json to you is good enough just return it without modifying.`
            },
            {
                role: 'user',
                content: message

            }
        ]
        ,
        temperature: 0.7,
      }),
    })
    console.log("HELLOs");

    const data = await response.json()

    if (!response.ok) {
      console.error('[OpenAI Error]', data)
      return { error: data.error?.message || 'Failed to call OpenAI' }
    }

    return {
      reply: data.choices?.[0]?.message?.content || '[No reply]',
      usage: data.usage, // Optional: includes token usage
    }
  } catch (err) {
    console.error('[Server Error]', err)
    return { error: 'Server error' }
  }
}


export async function refineIdea(idToken,messages) {
  // const userMessage = body.message

  if (!messages|| !idToken) {
    return { error: 'Message is required' }
  }

  const decoded = await adminAuth.verifyIdToken(idToken)
  const uid = decoded.uid

  try {
    const response = await fetch(api_link, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages:messages,
        temperature: 0.7,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[OpenAI Error]', data)
      return { error: data.error?.message || 'Failed to call OpenAI' }
    }

    return {
      reply: data.choices?.[0]?.message?.content || '[No reply]',
      usage: data.usage, // Optional: includes token usage
    }
  } catch (err) {
    console.error('[Server Error]', err)
    return { error: 'Server error' }
  }
}


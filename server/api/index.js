import { openai, speechKey } from "../ai.js";

const characters = {
  Alice: "Alice",
  Hatter: "Hatter"
}

//prompt is a string and character is a passed enum
function generateString(prompt, character) {
  switch (character) {
    case characters.Alice:
      return prompt + " in the style of Alice from Alice in the Wonderland"
    case characters.Hatter:
      return "Pretend you are the Mad Hatter. " + prompt
    // return prompt + " in the style of the Mad Hatter from Alice in the Wonderland. Answer in complete sentences."
  }
}


const generatePrompt = async (string, char) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-curie-001",
      prompt: generateString(string, char),
      temperature: 0.6,
      max_tokens: 1200,
    });
    console.log(JSON.stringify(completion.data.choices, null, 2));
    return completion.data.choices[0].text;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw new Error('An error occurred during your request.');
    }
  }
}

//Creates EncodedParams for generating audio
function generateEncodedParams(text, character) {
  const encodedParams = new URLSearchParams();

  switch (character) {
    case characters.Alice:
      encodedParams.append("voice_code", "en-US-1");
      encodedParams.append("speed", "1.00");
      encodedParams.append("pitch", "1.00");
      break
    case characters.Hatter:
      encodedParams.append("voice_code", "en-US-13");
      encodedParams.append("speed", ".85");
      encodedParams.append("pitch", ".90");
      break
  }

  encodedParams.append("text", text);
  encodedParams.append("output_type", "base64");
  return encodedParams

}
//Generates audio from the api request in base64 format
//Takes request as string and char
export const generateResponse = async (req, res) => {
  let { string, char } = req.body;
  if (string.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt.",
      }
    });
    return;
  }
  let response;
  try {
    response = await generatePrompt(string, char);
  }
  catch (error) {
    res.status(400).json(error);
    return;
  }
  const encodedParams = generateEncodedParams(response, char)
  const url = 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': speechKey,
      'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
    },
    body: encodedParams
  };
  fetch(url, options)
    .then(res => res.json())
    .then(jsonObj => {
      res.status(200).json({
        ai: response.trim(),
        audio: jsonObj
      })
    }).catch(err => console.error('error:' + err));
}

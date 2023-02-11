import { openai } from "../ai.js";

const characters = {
  Alice: "Alice",
  Hatter: "Hatter"
}

//prompt is a string and character is a passed enum
function generateString(prompt, character) {
  switch (character) {
    case characters.Alice:
      return prompt + "in the style of Alice from Alice in the Wonderland"
    case characters.Hatter:
      return prompt + "in the style of the Mad Hatter from Alice in the Wonderland"
  }
}


export const generatePrompt = async (req, res) => {
  let { string, char } = req.body;

  if (string.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generateString(string, char),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(400).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

//Creates EncodedParams for generating audio
function generateEncodedParams(text, character) {
  const encodedParams = new URLSearchParams();

  switch (character) {
    case characters.Alice:
      encodedParams.append("voice_code", "en-US-3");
      encodedParams.append("speed", ".90");
      encodedParams.append("pitch", ".80");
      break
    case characters.Hatter:
      encodedParams.append("voice_code", "en-US-1");
      encodedParams.append("speed", "1.00");
      encodedParams.append("pitch", "1.00");
      break
  }

  encodedParams.append("text", text);
  encodedParams.append("output_type", "base64");
  return encodedParams

}
//Generates audio from the api request in base64 format
//Takes request as string and char
export const generateAudio = async (req, res) => {
  let { string, char } = req.body;
  const encodedParams = generateEncodedParams(string, char)
  // const fetch = require('node-fetch');
  const url = 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': process.env.RapidAPI_Key,
      'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
    },
    body: encodedParams
  };
  fetch(url, options)
    .then(res => res.json())
    .then(jsonObj => {
      // console.log(jsonObj)
      res.status(200).json({ result: jsonObj });
    }).catch(err => console.error('error:' + err));
}


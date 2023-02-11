import {openai} from "../ai.js";

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
    let {string, char} = req.body;

    if (string.trim().length === 0) {
        res.status(400).json({
          error: {
            message: "Please enter a valid animal",
          }
        });
        return;
    }

    let characterCase;
    switch(char){
        case 'Alice':
            obj = characters.Alice;
            break;
        case 'Hatter':
            obj = characters.Hatter;
            break;
    }

    try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: generateString(string, characterCase),
          temperature: 0.6,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
      } catch(error) {
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


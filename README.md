# Wonderland Bot

To use:
1. git clone this repository
2. open a terminal and go into the server folder and run npm install
3. make a copy of .env.example and call it .env and place your api keys after the equal sign
4. Start the node server by running the command "node index.js"
4. Now open another terminal and go into the client folder and run npm install
5. Once the installation has finished run npm run serve
6. The app is now avaliable on localhost:8080
7. Enjoy!

## Getting your api keys
To get your openai api key, you must create an account. Then go the link https://platform.openai.com/account/api-keys and click "Create new API key". Copy paste that key into your .env file after OPENAI_API_KEY. 

To get your Cloudlab Text to Speech api key, go to https://rapidapi.com/cloudlabs-dev/api/cloudlabs-text-to-speech. Create an account on rapidapi and go to the cloudlabs-text-to-speech. Go to pricing and select the free option. In the endpoints you will see your key under X-RapidAPI-Key.
Copy and paste that key into your .env file after RAPIDAPI_KEY.



Note: You need to have a node version of 18 or higher




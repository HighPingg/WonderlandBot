import express from 'express';

const app = express()

import { generatePrompt } from './api/index.js'

const port = 4000;



app.post('/api', generatePrompt);



app.listen(port, () => {
    console.log(`App listening on ${port}`)
})
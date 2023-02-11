import express from 'express';
import cors from 'cors';

const app = express()
import { generateAudio } from './api/index.js'
const port = 4000;

app.use(cors({
    origin: ["http://localhost:8080"],
}))
app.use(express.json())

app.post('/api', generateAudio);



app.listen(port, () => {
    console.log(`App listening on ${port}`)
})
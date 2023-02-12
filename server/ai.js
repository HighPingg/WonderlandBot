import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export const speechKey = process.env.RAPIDAPI_KEY;
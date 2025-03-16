import { HfInference } from '@huggingface/inference'
import dotenv from 'dotenv';
dotenv.config();

// Create your Hugging Face Token: https://huggingface.co/settings/tokens
// Set your Hugging Face Token: https://scrimba.com/dashboard#env
// Learn more: https://scrimba.com/links/env-variables
const hf = new HfInference(process.env.HF_TOKEN)
// Hugging Face Inference API docs: https://huggingface.co/docs/huggingface.js/inference/README

const textToGenerate = "Generate 5 python related interview mcqs questions with there answer"

const response = await hf.textGeneration({
    inputs: textToGenerate,
})

console.log(response)
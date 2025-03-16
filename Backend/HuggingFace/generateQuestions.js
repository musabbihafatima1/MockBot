const { InferenceClient } = require("@huggingface/inference");

const HF_TOKEN = "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";
const inference = new InferenceClient(HF_TOKEN);

// Wrap everything in an async function
async function main() {
  try {
    // Chat completion API
    const out = await inference.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [{ role: "user", content: "Hello, nice to meet you!" }],
      max_tokens: 512,
    });
    console.log(out.choices[0].message);

    // Streaming chat completion API
    for await (const chunk of inference.chatCompletionStream({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [{ role: "user", content: "Hello, nice to meet you!" }],
      max_tokens: 512,
    })) {
      console.log(chunk.choices[0].delta.content);
    }

    // Using a third-party provider
    const thirdPartyResponse = await inference.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [{ role: "user", content: "Hello, nice to meet you!" }],
      max_tokens: 512,
      provider: "sambanova", // or together, fal-ai, replicate, cohere …
    });
    console.log(thirdPartyResponse);

    // Text-to-image API
    const imageResponse = await inference.textToImage({
      model: "black-forest-labs/FLUX.1-dev",
      inputs: "a picture of a green bird",
      provider: "fal-ai",
    });
    console.log(imageResponse);

    // Translation API
    const translationResponse = await inference.translation({
      inputs: "My name is Wolfgang and I live in Amsterdam",
      parameters: {
        src_lang: "en",
        tgt_lang: "fr",
      },
    });
    console.log(translationResponse);

    // Image-to-text API
    const imageToTextResponse = await inference.imageToText({
      model: 'nlpconnect/vit-gpt2-image-captioning',
      data: await (await fetch('https://picsum.photos/300/300')).blob(),
    });
    console.log(imageToTextResponse);

    // Using your own dedicated inference endpoint
    const gpt2 = inference.endpoint('https://xyz.eu-west-1.aws.endpoints.huggingface.cloud/gpt2');
    const { generated_text } = await gpt2.textGeneration({ inputs: 'The answer to the universe is' });
    console.log(generated_text);

    // Chat Completion with custom endpoint
    const llamaEndpoint = inference.endpoint(
      "https://router.huggingface.co/hf-inference/models/meta-llama/Llama-3.1-8B-Instruct"
    );
    const llamaResponse = await llamaEndpoint.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [{ role: "user", content: "Hello, nice to meet you!" }],
      max_tokens: 512,
    });
    console.log(llamaResponse.choices[0].message);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the async function
main();
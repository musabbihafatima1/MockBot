const { GoogleGenAI } = require('@google/genai');


const ai = new GoogleGenAI({ apiKey: "AIzaSyDHyXDMNSoq4-QXxG1VXvRriA8wyQhOoT4" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Generate 1 Mcqs on AI , fromat should be : Question, 4 options , correct answer",
  });
  console.log(response.text);
}

main();

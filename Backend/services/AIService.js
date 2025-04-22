const { GPT4All } = require('gpt4all');

class AIService {
    constructor() {
        this.model = null;
        this.isReady = false;
    }

    async initialize() {
        try {
            // Create new GPT4All instance
            this.model = new GPT4All('ggml-gpt4all-j-v1.3-groovy', {
                device: 'cpu',
                verbose: false
            });

            // Initialize and download missing files
            await this.model.init();
            await this.model.open();
            this.isReady = true;
            console.log('GPT4All initialized successfully');
        } catch (error) {
            console.error('GPT4All initialization failed:', error);
            this.isReady = false;
        }
    }

    async generateQuestions(field, count = 5) {
        if (!this.isReady) {
            throw new Error('AI model is not ready');
        }

        const prompt = `Generate ${count} multiple-choice questions for a ${field} position interview.
        Format each question as:
        {
            "question": "Question text",
            "options": ["A) Option1", "B) Option2", "C) Option3", "D) Option4"],
            "answer": "Correct letter",
            "explanation": "Brief explanation"
        }
        Return only a valid JSON array.`;

        try {
            const response = await this.model.prompt(prompt);
            const jsonStart = response.indexOf('[') >= 0 ? response.indexOf('[') : response.indexOf('{');
            const jsonEnd = response.lastIndexOf(']') >= 0 ? response.lastIndexOf(']') + 1 : response.lastIndexOf('}') + 1;
            const jsonString = response.slice(jsonStart, jsonEnd);
            
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Generation error:', error);
            throw error;
        }
    }
}

module.exports = new AIService();
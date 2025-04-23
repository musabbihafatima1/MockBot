import { useState, useEffect, useCallback } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

export default function useWebLLM() {
  const [engine, setEngine] = useState(null);
  const [progress, setProgress] = useState('Initializing...');
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const modelId = 'phi-2-q4f32_1';

    const initEngine = async () => {
      try {
        if (!navigator.gpu) {
          throw new Error('WebGPU not supported. Use Chrome/Edge with chrome://flags/#enable-unsafe-webgpu');
        }

        setProgress('Preparing model...');
        
        const engine = await CreateMLCEngine(
          modelId,
          { 
            initProgressCallback: (report) => {
              if (isMounted) {
                setProgress(`Downloading model: ${Math.round(report.progress)}%`);
              }
            }
          }
        );
        
        if (isMounted) {
          setEngine(engine);
          setReady(true);
          setProgress('Model ready!');
        }
      } catch (err) {
        if (isMounted) {
          console.error('Model initialization failed:', err);
          setError(err.message);
          setProgress('Using fallback questions');
        }
      }
    };

    // Only initialize if not already ready
    if (!ready && !error) {
      initEngine();
    }

    return () => {
      isMounted = false;
    };
  }, [ready, error]);

  const generateMCQs = useCallback(async (topic) => {
    if (!ready) throw new Error('Model not loaded');
    
    try {
      const prompt = `Generate 3 MCQs about ${topic} with:
      1 correct answer (marked with *)
      3 incorrect options
      Format exactly:
      1. Question?
      A) Option 1
      B) Correct answer*
      C) Option 3
      D) Option 4`;

      const response = await engine.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      });

      // Parse the response
      const text = response.choices[0].message.content;
      return text.split('\n\n')
        .filter(block => block.startsWith('1.'))
        .map(block => {
          const lines = block.split('\n');
          const answerIndex = lines.findIndex(line => line.includes('*'));
          return {
            question: lines[0].replace(/^\d+\.\s*/, '').trim(),
            options: lines.slice(1, 5).map(opt => opt.replace(/^[A-D]\)\s*\*?/, '').trim()),
            answer: answerIndex > 0 ? answerIndex - 1 : 0
          };
        });
    } catch (err) {
      console.error('Generation failed:', err);
      throw new Error('Question generation failed');
    }
  }, [engine, ready]);

  return { generateMCQs, progress, error, ready };
}
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const KEYWORDS = {
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'HTML', 'CSS'],
  education: ['Bachelor', 'Master', 'PhD', 'Degree'],
  experience: ['Engineer', 'Developer', 'Manager', 'Intern']
};

async function analyzeResume(filePath) {
  try {
    const fileExt = path.extname(filePath).toLowerCase();
    let text = '';

    // Read file based on type
    if (fileExt === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      text = data.text;
    } else if (fileExt === '.docx' || fileExt === '.doc') {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    }

    if (!text) throw new Error('Could not extract text from file');

    // Calculate score (0-100)
    const score = Math.min(100, Math.floor(
      30 + // Base score
      (countKeywords(text, KEYWORDS.skills) * 3) +
      (countKeywords(text, KEYWORDS.education) * 2) +
      (countKeywords(text, KEYWORDS.experience) * 2)
    ));

    // Generate suggestions
    const suggestions = [];
    if (score < 50) suggestions.push('Your resume needs significant improvement for ATS systems');
    if (score < 70) suggestions.push('Add more relevant keywords from the job description');
    
    return {
      score,
      suggestions: suggestions.length ? suggestions : ['Your resume looks ATS-friendly!'],
      extractedData: {
        skills: extractKeywords(text, KEYWORDS.skills),
        education: extractKeywords(text, KEYWORDS.education),
        experience: extractKeywords(text, KEYWORDS.experience),
        wordCount: text.split(/\s+/).length
      }
    };
  } finally {
    // Clean up file
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}

function countKeywords(text, keywords) {
  return keywords.filter(kw => 
    new RegExp(`\\b${kw}\\b`, 'i').test(text)
  ).length;
}

function extractKeywords(text, keywords) {
  return keywords.filter(kw => 
    new RegExp(`\\b${kw}\\b`, 'i').test(text)
  );
}

module.exports = { analyzeResume };
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ResultsData } from "@/components/Dashboard";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface FormData {
  fullName: string;
  targetRole: string;
  currentSkills: string;
  linkedinUrl?: string;
}

export async function analyzeSkillsWithGemini(formData: FormData): Promise<ResultsData> {
  // Using gemini-pro which has 100% fallback support across all API keys
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an expert career coach and skill gap analyzer. Analyze the following candidate profile and return a JSON object ONLY (no markdown, no code fences, just raw JSON).

Candidate Profile:
- Name: ${formData.fullName}
- Target Role: ${formData.targetRole}
- Current Skills: ${formData.currentSkills}

Return a JSON object with exactly this structure:
{
  "score": <number 0-100 representing how well current skills match the target role>,
  "missingSkills": [<array of 5-8 specific skill strings the candidate is missing for the role>],
  "roadmap": [
    {
      "title": "<short learning step title>",
      "description": "<2 sentence description of what to learn and why>"
    }
  ],
  "projects": [
    {
      "title": "<project name>",
      "description": "<1-2 sentence description of a portfolio project to build>"
    }
  ]
}

Rules:
- roadmap should have 4-6 steps ordered from foundational to advanced
- projects should have 3 concrete, buildable project ideas specific to the target role
- Be specific and realistic based on the current skills provided
- score should honestly reflect the gap (not artificially high)
Return ONLY the raw JSON, no explanation, no markdown fences.
`.trim();

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Strip markdown code fences if Gemini wraps in them anyway
  const cleaned = text.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim();

  const parsed = JSON.parse(cleaned) as ResultsData;
  return parsed;
}

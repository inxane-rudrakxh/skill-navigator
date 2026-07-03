import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ResultsData } from "@/components/Dashboard";

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const isGeminiConfigured = !!geminiApiKey;

const genAI = isGeminiConfigured ? new GoogleGenerativeAI(geminiApiKey) : null;

interface FormData {
  fullName: string;
  targetRole: string;
  currentSkills: string;
  linkedinUrl?: string;
}

export async function analyzeSkillsWithGemini(formData: FormData): Promise<ResultsData> {
  if (!isGeminiConfigured) {
    console.warn("Gemini API key not found. Returning mock analysis data.");
    // Simulate a brief delay to look like it's thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Parse current skills to make it look realistic
    const currentSkillsList = formData.currentSkills
      ? formData.currentSkills.split(",").map((s) => s.trim())
      : ["JavaScript", "HTML", "CSS"];
      
    const score = Math.floor(Math.random() * 26) + 60; // 60-85
    
    // Define mock options based on target role
    const isProduct = formData.targetRole.toLowerCase().includes("product") || formData.targetRole.toLowerCase().includes("manager");
    const isData = formData.targetRole.toLowerCase().includes("data") || formData.targetRole.toLowerCase().includes("scientist");
    
    let missingSkills = ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "REST APIs", "Git & GitHub"];
    let roadmap = [
      {
        title: "Master React & TypeScript",
        description: "Learn component design patterns, state management with hooks, and how to build type-safe UIs with TypeScript."
      },
      {
        title: "Build Backend APIs with Node & Express",
        description: "Understand server-side logic, routing, middleware, and database connectivity."
      },
      {
        title: "Learn Modern Styling with Tailwind CSS",
        description: "Use utility-first classes to build responsive, beautiful layouts rapidly."
      },
      {
        title: "Deploy Full-Stack Projects",
        description: "Set up version control with Git, host the client on Vercel, and use Render for backend."
      }
    ];
    let projects = [
      {
        title: "Personal Portfolio & Dashboard",
        description: "Build a responsive portfolio showing your projects and stats, using React, Tailwind CSS, and charts."
      },
      {
        title: "Real-time Collaboration Platform",
        description: "Create a chat or collaboration tool with web sockets for real-time status updates and database persistence."
      },
      {
        title: "E-Commerce Mock Storefront",
        description: "Design a full checkout flow, products grid with search filters, shopping cart, and Stripe integrations."
      }
    ];

    if (isProduct) {
      missingSkills = ["Agile/Scrum", "Product Roadmap Planning", "User Research", "A/B Testing", "SQL & Analytics", "Jira & Confluence"];
      roadmap = [
        {
          title: "Learn Product Strategy & Lifecycle",
          description: "Study how to define product visions, establish key metrics (KPIs), and conduct user interviews."
        },
        {
          title: "Master Scrum and Agile Methodologies",
          description: "Understand ticket writing, sprint planning, and coordinating with design and development teams."
        },
        {
          title: "Learn Data Analytics & SQL",
          description: "Get comfortable querying databases and analyzing user engagement logs to make data-backed decisions."
        }
      ];
      projects = [
        {
          title: "Product Requirement Document (PRD)",
          description: "Draft a comprehensive PRD for a new mobile application feature detailing specs, user flows, and wireframes."
        },
        {
          title: "Conversion Funnel Optimization",
          description: "Analyze user exit points on an e-commerce page and write a deck proposing design optimizations."
        }
      ];
    } else if (isData) {
      missingSkills = ["Python", "Pandas & NumPy", "SQL & Databases", "Machine Learning Models", "Data Visualization", "Tableau/PowerBI"];
      roadmap = [
        {
          title: "Python for Data Analysis",
          description: "Master Python programming and learn libraries like Pandas, NumPy, and Matplotlib."
        },
        {
          title: "Relational Databases & SQL",
          description: "Learn complex SQL queries, window functions, and database design for fetching data."
        },
        {
          title: "Introduction to Machine Learning",
          description: "Understand supervised and unsupervised learning algorithms using Scikit-Learn."
        }
      ];
      projects = [
        {
          title: "Customer Churn Prediction Model",
          description: "Train a binary classifier to predict user cancellation rates using historical data and present visualizations."
        },
        {
          title: "Sales Interactive Dashboard",
          description: "Import clean datasets into PostgreSQL and connect a Tableau dashboard showing monthly trends."
        }
      ];
    }

    // Filter out skills they already have
    const filteredMissing = missingSkills
      .filter((s) => !currentSkillsList.some((cs) => cs.toLowerCase().includes(s.toLowerCase())))
      .slice(0, 5);

    return {
      score,
      missingSkills: filteredMissing.length > 0 ? filteredMissing : missingSkills.slice(0, 4),
      roadmap,
      projects
    };
  }

  // Using gemini-2.5-flash as it is supported by the current API key
  const model = genAI!.getGenerativeModel({ model: "gemini-2.5-flash" });

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

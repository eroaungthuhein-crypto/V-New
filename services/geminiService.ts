import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedNewsResponse } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey });

export const generateNewsArticle = async (topic: string): Promise<GeneratedNewsResponse> => {
  const model = "gemini-2.5-flash";
  
  const systemInstruction = `You are a professional journalist for a Burmese news website covering Vietnam. 
  Your task is to write a realistic news article about the provided topic related to Vietnam.
  The content MUST be in the Burmese language.
  The tone should be formal and informative.
  Ensure the content is culturally relevant to Vietnam but written for a Burmese audience.`;

  const prompt = `Write a news article about: "${topic}". 
  Provide a title, a short excerpt, the full content body (at least 3 paragraphs), and a category (e.g., Economy, Travel, Culture).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Headline in Burmese" },
            excerpt: { type: Type.STRING, description: "Short summary in Burmese (2-3 sentences)" },
            content: { type: Type.STRING, description: "Full article body in Burmese" },
            category: { type: Type.STRING, description: "Category of the news (e.g., Economy, Travel)" },
          },
          required: ["title", "excerpt", "content", "category"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedNewsResponse;
    }
    
    throw new Error("No text returned from Gemini");
  } catch (error) {
    console.error("Error generating news:", error);
    throw error;
  }
};
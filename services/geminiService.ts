
import { GoogleGenAI, Type } from "@google/genai";
import { LivestockData } from "../types";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI;

  private constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async askExpert(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are an expert biosecurity consultant for pig and poultry farms. 
          Provide practical, scientifically accurate, and easy-to-implement advice. 
          Keep your answers concise and professional. 
          Use bullet points for lists.`,
          temperature: 0.7,
        },
      });
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "An error occurred while contacting the AI advisor.";
    }
  }

  public async generateReport(data: LivestockData): Promise<any> {
    try {
      const prompt = `Act as a senior veterinary biosecurity auditor. Analyze this farm data:
        PIG DATA: Count: ${data.pigs.count}, Last Vax: ${data.pigs.lastVaccination || 'None'}, Notes: ${data.pigs.healthNote || 'None'}
        HEN DATA: Count: ${data.hens.count}, Last Vax: ${data.hens.lastVaccination || 'None'}, Notes: ${data.hens.healthNote || 'None'}
        
        Today is ${new Date().toLocaleDateString()}.
        Compare the vaccination dates to today. If older than 6 months, flag it.
        Evaluate the health notes for disease red flags.
        Assess density risks based on the animal counts.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              healthStatus: { type: Type.STRING, description: "One of: Excellent, Good, Fair, Critical" },
              overallScore: { type: Type.NUMBER, description: "0 to 100" },
              alerts: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              dataInsights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING, description: "e.g., Vaccination, Population, Observation" },
                    observation: { type: Type.STRING, description: "Data-specific finding referring to user numbers" },
                    riskLevel: { type: Type.STRING, description: "Low, Medium, or High" }
                  },
                  required: ["category", "observation", "riskLevel"]
                }
              }
            },
            required: ["summary", "healthStatus", "alerts", "recommendations", "overallScore", "dataInsights"]
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Report Error:", error);
      throw error;
    }
  }
}

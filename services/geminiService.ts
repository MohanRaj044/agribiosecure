
import { GoogleGenAI } from "@google/genai";

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
      return "An error occurred while contacting the AI advisor. Please try again later.";
    }
  }
}

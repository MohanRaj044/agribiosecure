import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateArchitectureImage() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: "A professional, clean, and modern system architecture diagram for a farm biosecurity AI project called 'AgriBioSecure Portal'. The diagram should show four main layers: 1. User Layer (Farmer with mobile device), 2. Frontend Layer (React Dashboard), 3. AI Engine Layer (Neural network icon), and 4. Compliance Layer (Shield icon). Use a color palette of forest green, sage, and earthy browns. The style should be flat, minimalist, and high-quality, suitable for a technical presentation.",
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  return response;
}

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface WasteAnalysis {
  category: string;
  confidence: number;
  explanation: string;
  disposalTips: string[];
  points: number;
}

export const analyzeWaste = async (base64Image: string): Promise<WasteAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        {
          text: "Analyze this image for waste items. Classify the main item into one of these categories: Plastic, Organic, Paper, Metal, Glass, E-waste, Hazardous. Provide a confidence score, a brief explanation, and 3 disposal tips. Also, assign a 'points' value between 10 and 50 based on the difficulty of recycling it.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          explanation: { type: Type.STRING },
          disposalTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          points: { type: Type.NUMBER }
        },
        required: ["category", "confidence", "explanation", "disposalTips", "points"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const ecoChat = async (message: string, history: { role: string, content: string }[]) => {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are EcoBot, a sustainability expert for EcoChain. Help users with recycling queries, waste disposal tips, and general environmental guidance. Keep answers concise, helpful, and motivating."
    }
  });

  const response = await chat.sendMessage({
    message: message
  });

  return response.text;
};

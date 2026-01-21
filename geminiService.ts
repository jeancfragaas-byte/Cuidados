
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDailyReflection = async (): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere uma frase curta (máximo 20 palavras) e neutra de bem-estar e incentivo profissional para assistentes sociais e profissionais da área social. Evite termos clínicos ou promessas terapêuticas. Foque em equilíbrio e pausa.",
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    
    return response.text?.trim() || "Respire fundo e reserve um momento para você hoje.";
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return "O cuidado com o outro começa pelo cuidado consigo mesmo.";
  }
};

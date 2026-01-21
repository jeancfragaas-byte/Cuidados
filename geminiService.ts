
import { GoogleGenAI } from "@google/genai";

export const getDailyReflection = async (): Promise<string> => {
  try {
    // Inicialização direta conforme diretrizes
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere uma frase curta (máximo 15 palavras) e neutra de bem-estar profissional para quem trabalha na área social. Foco em pausa e equilíbrio. Sem termos clínicos.",
      config: {
        temperature: 0.6,
        topP: 0.9,
      }
    });
    
    return response.text?.trim() || "Respire fundo e reserve um momento para o seu equilíbrio hoje.";
  } catch (error) {
    console.error("Vercel Deployment Error (API):", error);
    return "O cuidado com o outro começa pelo respeito ao seu próprio ritmo.";
  }
};

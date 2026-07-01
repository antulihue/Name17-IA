import { GoogleGenAI } from '@google/genai';

// Inicializamos el SDK de Google con la variable de entorno segura
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req: any, res: any) {
  // Habilitar CORS para que tu frontend pueda consultar esta API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { tipo, contenido } = req.body; // 'tipo' puede ser email, link, img, etc.

    // Armamos el prompt dinámico según lo que el usuario quiera escanear
    const prompt = `Actúa como un experto en ciberseguridad avanzada. Analiza el siguiente ${tipo} sospechoso y determina si es un ataque de Phishing, Malware, Fraude o si es Seguro. 
    Contenido a analizar: ${contenido}
    
    Devuelve la respuesta estrictamente en formato JSON con la siguiente estructura:
    {
      "estado": "Peligroso" o "Sospechoso" o "Seguro",
      "tipoAtaque": "Phishing / Ninguno / etc",
      "confianza": un numero de 0 a 100,
      "analisis": "Explicación detallada de los puntos detectados"
    }`;

    // Llamamos al modelo gratuito y rápido de Gemini (flash)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // Parseamos la respuesta de la IA y se la devolvemos al frontend
    const resultadoTexto = response.text || "{}";
    return res.status(200).json(JSON.parse(resultadoTexto));

  } catch (error: any) {
    return res.status(500).json({ error: 'Error en el análisis', detalles: error.message });
  }
}
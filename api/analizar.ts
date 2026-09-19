import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY no configurada',
      detalles: 'Configurá GEMINI_API_KEY en Vercel > Settings > Environment Variables y volvé a desplegar.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { tipo, contenido } = body || {};

    if (!tipo || typeof tipo !== 'string') {
      return res.status(400).json({ error: 'Falta el tipo de contenido' });
    }
    if (!contenido || typeof contenido !== 'string' || !contenido.trim()) {
      return res.status(400).json({ error: 'Falta el contenido a analizar' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = [
      'Actúa como un experto en ciberseguridad avanzada.',
      'Analiza el siguiente ' + tipo + ' sospechoso.',
      'Determina si es Phishing, Malware, Fraude, Ingeniería social o Seguro.',
      'Contenido a analizar:',
      contenido,
      '',
      'Devuelve ÚNICAMENTE JSON válido con esta estructura:',
      '{ "estado": "Peligroso", "tipoAtaque": "Phishing", "confianza": 95, "analisis": "Explicación detallada" }',
      'estado debe ser Peligroso, Sospechoso o Seguro.',
      'confianza debe ser un número entero de 0 a 100.',
    ].join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const resultadoTexto = response.text?.trim();
    if (!resultadoTexto) {
      return res.status(502).json({ error: 'Gemini no devolvió una respuesta' });
    }

    const resultado = JSON.parse(resultadoTexto);
    if (
      !['Peligroso', 'Sospechoso', 'Seguro'].includes(resultado.estado) ||
      typeof resultado.tipoAtaque !== 'string' ||
      typeof resultado.confianza !== 'number' ||
      typeof resultado.analisis !== 'string'
    ) {
      return res.status(502).json({
        error: 'Respuesta inválida de Gemini',
        detalles: 'La IA no devolvió la estructura de análisis esperada.',
      });
    }

    resultado.confianza = Math.max(0, Math.min(100, Math.round(resultado.confianza)));
    return res.status(200).json(resultado);
  } catch (error: any) {
    console.error('Error en /api/analizar:', error);
    return res.status(500).json({
      error: 'Error en el análisis',
      detalles: error?.message || 'Error desconocido',
    });
  }
}
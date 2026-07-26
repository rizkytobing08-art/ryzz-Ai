import { GoogleGenerativeAI, Part } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const formData = await req.formData();
  const prompt = formData.get('prompt') as string;
  const file = formData.get('file') as File | null;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "Kamu adalah Ryzz.AI. Asisten AI pribadi yang cerdas, akurat, dan helpful. Jawab selalu dalam Bahasa Indonesia. Kalau disuruh analisa gambar atau PDF, jelaskan sedetail mungkin."
  });

  const parts: Part[] = [{ text: prompt }];
  
  // Kalau ada file gambar/pdf yg diupload
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    parts.push({ 
      inlineData: { 
        data: buffer.toString('base64'), 
        mimeType: file.type 
      } 
    });
  }

  const result = await model.generateContent(parts);
  return Response.json({ reply: result.response.text() });
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if(message.toLowerCase().includes("buat gambar")){
      const prompt = message.replace("buat gambar", "").trim();
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp-image-generation" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const imagePart = response.candidates?.[0]?.content?.parts?.find((p:any) => p.inlineData);
      if(imagePart){
        return Response.json({ 
          text: `Nih gambarnya: "${prompt}"`,
          image: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
        });
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    return Response.json({ text: response.text() });

  } catch (error) {
    return Response.json({ text: "Error: " + error.message });
  }
}

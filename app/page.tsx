import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { message } = await req.json();
  
  // Cek kalau user minta buat gambar
  if(message.toLowerCase().includes("buat gambar") || message.toLowerCase().includes("create image")){
    const prompt = message.replace("buat gambar", "").replace("create image", "").trim();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp-image-generation" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Ambil gambar dari response
    const imagePart = response.candidates?.[0]?.content?.parts?.find((p:any) => p.inlineData);
    if(imagePart){
      return Response.json({ 
        text: `Nih gambarnya: "${prompt}"`,
        image: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
      });
    }
  }

  // Kalau bukan buat gambar, chat biasa
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(message);
  const response = await result.response;
      setChat(prev => [...prev, {role: "Ryzz AI", text: data.text, image: data.image}]);
}

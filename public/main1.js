import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadImage, canvasToBlob } from "canvas";

const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function analyzeImage(imageUrl, prompt) {
  try {
    const image = await loadImage(imageUrl);
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    const blob = await canvasToBlob(canvas, "image/jpeg");
    const formData = new FormData();
    formData.append("image", blob, "image.jpg");
    formData.append("prompt", prompt);

    const response = await fetch("https://api.example.com/analyze-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error analyzing image");
    }

    const data = await response.json();
    const imageDescription = data.description;

    const aiResponse = await model.generateContent({
      prompt: `Analyze this image description: ${imageDescription}`,
    });

    return aiResponse.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "An error occurred. Please try again.";
  }
}

// Usage example:
const imageUrl = "/user.png";
const prompt = "Describe the image in detail.";
const result = await analyzeImage(imageUrl, prompt);
console.log(result);
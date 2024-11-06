import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Replace 'YOUR_API_KEY' with your actual API key
const genAI = new GoogleGenerativeAI(`AIzaSyB3QzKMg6ZQEW5X6NS_FzcpTAJ400yi_kc`);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const imageUrl = 'C:/Users/shafe/Downloads/man-user-color-icon.png';
// Function to analyze an image
async function analyzeImage(imageData) 
{
    const image = {
        inlineData: {
            data: imageData,
            mimeType: 'image/jpeg', // Adjust mime type as needed
        },
    };

    const prompt = "What is the main subject of this image?";
    const result = await model.generateContent([prompt, image]);
    return result.response.text();
}

// Example usage:
const imageData = fs.readFileSync(imageUrl, 'base64');
analyzeImage(imageData)
    .then(result => {
        console.log(result); // Output the analysis result
    })
    .catch(error => {
        console.error(error);
    });
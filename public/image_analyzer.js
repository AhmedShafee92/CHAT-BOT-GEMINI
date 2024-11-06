const { GoogleGenerativeAI } = require('@google/generative-ai');
// Replace 'YOUR_API_KEY' with your actual API key
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
const imageData = fs.readFileSync('user.png', 'base64');
analyzeImage(imageData)
    .then(result => {
        console.log(result); // Output the analysis result
    })
    .catch(error => {
        console.error(error);
    });
import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";

// initialize the model 
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);
const model = genAI.getGenerativeModel({model:"gemini-pro"});
const response = " ";

let  history = [];

async function getResponse(prompt)
{ 
  var response =  " ";
  var chat = " ";
  var result = " ";
  try 
  {
      chat = await model.startChat({history:history});   
  } catch (error) 
  {
    chat = "Error equre when tring to access the history ";
  }
  // const message = await model.generateContent(prompt);
  try 
  {
     result = await chat.sendMessage(prompt);
  } catch (error) 
  {
    result = "Error aqure when ting to send the message ";
  }
  try
  {
    response = await result.response;
  }
  catch(error)
  {
    response = "Can't give an answer from the server, please ask again or change your question ";
  }

  const text = response.text();
  console.log(text);
  return text;
}


async function handleSubmit(event)
{
    event.preventDefault();
    let userMessage = document.getElementById("prompt");
    const chatArea = document.getElementById("chat-container"); 
    var prompt = userMessage.value.trim(); 
    if (prompt ===  '')
    {
      return;
    }
    console.log("user message ",prompt);
    chatArea.innerHTML += userDiv(prompt);
    userMessage.value = "";
    const aiResponse = await getResponse(prompt);
    let md_text = md().render(aiResponse);
    chatArea.innerHTML += aiDiv(md_text);

    /*
    let newUserRole = {
      role: "user",
      parts: prompt,
    };
    let newAIRole = {
      role: "model",
      parts: aiResponse,
    };
  
    history.push(newUserRole);
    history.push(newAIRole);
  
    console.log(history);
    */
}

// User Chat 
export const userDiv = (data) => {
  return `
              <div class="flex  items-center gab-2 justify-start">
                <img src="user.png" alt="user icon " class="w-10 h-10 rounded-full">
                <p class="bg-gemDeep text-white p-1 rounded-md shadow-md">
                  ${data}     
                </p>
              </div>
        `;
};

// AI Chat 
export const aiDiv = (data) =>{
return ` <div class="flex gab-2 justify-end">
              <pre class="bg-gemRegular/40 text-gemDeep p-1 rounded-md shadow-md">
                 ${data} 
              </pre>
            <img src="chat-bot.png" alt="user icon " class="w-10 h-10 rounded-full"> 
            </div> `;

};

const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit",handleSubmit);

chatForm.addEventListener("keyup",(event) =>{
  if(event.keyCode === 13) handleSubmit(event);
});

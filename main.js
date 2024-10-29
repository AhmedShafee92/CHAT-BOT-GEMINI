// Here is the google gemeni library (importing the API )
import { GoogleGenerativeAI } from "@google/generative-ai";
// the md style library (for desgin instead create our css file )
import md from "markdown-it";

// initialize the model 
// Here we access the google gemeni API using our API_KEY to access the server  
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);
// Here we choose which model of the gemeni will use in this case we'r using the "gemini-pro"
const model = genAI.getGenerativeModel({model:"gemini-pro"});
// create var response which will content the reponse from the gemini 
const response = " ";
// history array which will help the gemini API to analyse the data in the best way .
let  history = [];

// create chatArea var to control tthe chat-conainer (chat-page.html file)
const chatArea = document.getElementById("chat-container"); 
// create var userMessage to control the prompt in the (chat-page.html file)
let userMessage = document.getElementById("prompt");
// image space 
const imageInput = document.getElementById("image");

// This function got the user input as "prompt " and return the response from the gemini API (return string as answer)
// we can add this as inline script inside the html file 
async function getResponse(prompt)
{ 
  // create an empty response var 
  var response =  " ";
  // create an assest var which will help us to return the response 
  var chat = " ";
  // create an assest var which will help us to return the response 
  var result = " ";
  try 
  {
    //Here we ansert to "chat" the history . 
    chat = await model.startChat({history:history});   
  } catch (error) 
  {
    // if we failed to get response from the google gemini API then chat will return error access to the API server 
    chat = "Error equre when tring to access the history ";
  }
  // const message = await model.generateContent(prompt);
  try 
  {
    // Here we try to use the sendMessage (but the sendMessage not exist which not correct way )
    // there's no declartion for the sendMessage function in the main.js
    result = await chat.sendMessage(prompt);
  } catch (error) 
  {
    // return error if the sendMessage function failed 
    result = "Error aqure when ting to send the message ";
  }
  try
  {
    response = await result.response;
  }
  catch(error)
  {
    response = "Can't give an answer from the server, please ask again or change your question";
  }

  // convert the response of the gemini API to string and insert inside the text
  const text = response.text();
  console.log(text);
  return text;
}

/* 
  This function is handling the responce from the google gemini API 
  and put the reponse inside an html page 

  Note : mabye we don't need this function 
*/
async function handleSubmit(event)
{
    // there's no declartion for the preventDefault function in the main.js
    event.preventDefault();
    /* 
      Here we check if the user message (input ) is not empty 
      if the user message is empty then we return null string  
    */
    var prompt = userMessage.value.trim(); 

    function checkImageInput() {
      if (imageInput.files.length === 0) {
        // No image selected
        return 0;
        // Add error message or prevent form submission
      } else {
        // Image selected
        return 1;
        // Proceed with image processing
      }
    }
    // if the text and image is empty 
    if (prompt ===  '' && checkImageInput() === 0)
    {
      return;
    }else if(prompt !==  '')
    {
      // Here we show the user message on the in the html 
      // Note here we mabye wil delete this , becusae we just need the responce as string without control the html web 
      console.log("user message ",prompt);
      // THE same here we try to insert the user inout inside the html web page 
      chatArea.innerHTML += userDiv(prompt);
    // here what we need the response of the server API from  the google gemini . 
    // we create aiResponse that get the response from the getResponse function 
    const aiResponse = await getResponse(prompt);
    // Here also try to adding the responce to the html page 
    // Note we don't need all this 
    let md_text = md().render(aiResponse);
    chatArea.innerHTML += aiDiv(md_text);
    // add the end of the user input 
      userMessage.value = "";
    }else if(checkImageInput())
    { 
        const messageDiv = document.createElement('div');
        // add the type of the side converstion     
        messageDiv.classList.add('chat-message', 'user');
        
       // create img var that can be like (image element in the web page ) 
        const img = document.createElement('img');
        // insert the image input from the user to the img var  
        img.src = imageInput.files[0];
        // add to the var image "chat-image " string  
        img.classList.add('chat-image');
        // insert the img var to the messageDiv 
        messageDiv.appendChild(img);
        chatArea.appendChild(img);
       // should find an option to disapper the image : imageInput = "";
       imageInput.value = ''; // Clear file input after sending

      } 

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


/* 
  Here we can see the two Div that will help the handleResponse function 
  Note : in this stage we don't use the handleResponse function, then this two div will not use 
*/

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

// Note : these also will help the handleResponse function which mabye will delete 
const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit",handleSubmit);

chatForm.addEventListener("keyup",(event) =>{
  if(event.keyCode === 13) handleSubmit(event);
});


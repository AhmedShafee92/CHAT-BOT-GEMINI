        // Here we create four web element that will control the web page (access byId)
        // chatBox var (this's a Div web element )
        const chatBox = document.getElementById('chat-box');
        // chatInput (text input ) var (this's a input web element )
        const chatInput = document.getElementById('chat-input');
        // imageInput var (This's input web element )
        const imageInput = document.getElementById('image-input');
        // send button var (This's button web element ) 
        const sendButton = document.getElementById('send-button');

        // Function which add a message to the chat box
        /* 
            Variables of addMessage 
            
            Content :The value that the user enter (Input in the html sentex)
            sender : "User" or "Bot" will be user by defualt elese will be the bot 
            isImage : "False" or "True" by defualt False else True if the user send image as input 
         */
        function addMessage(content, sender = 'user', isImage = false) 
        { 
            // Here we create a div var, which will be added to the div: chat_box ("chat_input div" in html page ).
            // Here we will create a div that will be finally added to the chat_box div in the html page . 
            const messageDiv = document.createElement('div');
            // add the type of the side converstion     
            messageDiv.classList.add('chat-message', sender);
            // The input of the user is content image
            if (isImage) 
            {     
                // create img var that can be like (image element in the web page ) 
                const img = document.createElement('img');
                // insert the image input from the user to the img var  
                img.src = content;
                // add to the var image "chat-image " string  
                img.classList.add('chat-image');
                // insert the img var to the messageDiv 
                messageDiv.appendChild(img);
            } 
            // The input of the user is only text 
            else 
            {
                // create messageContent var as a(p web element page )
                const messageContent = document.createElement('p');
                // add the user input text message to the var messageContent that created 
                messageContent.textContent = content;
                // add the messageContent to the messageDiv div which will be added finally to the chatbox div 
                messageDiv.appendChild(messageContent);
            }
            // here we added the div var which created in the function to the chatBox div in the html web page 
            chatBox.appendChild(messageDiv);
            // Auto-scroll to the bottom (suitable the div chatbox to be bigger )
            chatBox.scrollTop = chatBox.scrollHeight; 
        }


        // here we need to added the response from the google gemeni instaed of the defualt bot response 
        //This function got userMeassage (input of the user) which will be inside the chatInput in this script 
        function botResponse(userMessage) 
        {
           // Here we create a defualt response for the userMeassage 
           // should replace this with AI response that we will get from the gemeni API 
            setTimeout(() => {

                // We need to replace the userMessage with gemeni response .
                // -------------
                const botMessage = `Bot: You said "${userMessage}"`;
                addMessage(botMessage, 'bot');
            
            }, 1000);
        }

        // Handle message sending
        // This function handle the user message 
        // The user will send text or image (there no option yet for image + text  togther )
        
        // if the user send text : 
        
        // if the user send image : 

        function sendMessage() 
        {
            const text = chatInput.value.trim(); // this's the text input that the user send . 
            const imageFile = imageInput.files[0]; // this's the image that the user send .

            if (text) 
            {
                addMessage(text, 'user');

                // the bot response should replace with the suitable message 
                botResponse(text);
                chatInput.value = ''; // Clear the input
            } else if (imageFile) 
            {
                const reader = new FileReader();
                reader.onload = function (e) 
                {
                    addMessage(e.target.result, 'user', true);
                
                    // the bot response should replace with the suitable message 
                    botResponse('an image'); // Simulate a bot response for image
                };
                reader.readAsDataURL(imageFile); // Convert image to base64 URL
                imageInput.value = ''; // Clear file input after sending
            }
        }

        // Add event listeners
        sendButton.addEventListener('click', sendMessage);

        // Allow pressing Enter to send the text message (event listeners)
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });

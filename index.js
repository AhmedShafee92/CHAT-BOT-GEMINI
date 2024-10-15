// Import the Express module 
const express = require('express'); 

// Create an instance of an Express application 
const app = express(); 

// Mount App1 
const app1 = require('./App1'); 

// Mounts App1 at the '/app1' endpoint 
app.use('/app1', app1); 

// Mount App2 
const app2 = require('./App2'); 

// Mounts App1 at the '/app2' endpoint 
app.use('/app2', app2); 

// Start the server 
const port = 3000; 
app.listen(port, () => { 
	console.log(`CombinedApp is listening on port ${port}`); 
});

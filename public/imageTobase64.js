
  document.getElementById('imageInput').addEventListener('change', function() {
    const file = this.files[0];
    
    // if the image not empty 
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function() {
        // Remove the data:image/png;base64, part
        const base64String = reader.result.split(',')[1];
        document.getElementById('base64Output').textContent = base64String;
      };
      
      reader.onerror = function(error) {
        console.error('Error: ', error);
      };
      
      reader.readAsDataURL(file); // Convert image file to base64 string
    }
  });

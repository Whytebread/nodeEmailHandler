// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the form element
    let contactForm = document.getElementById('contactForm');
    
    // Add submit event listener to the form
    contactForm.addEventListener('submit', (event) => {
        // Prevent the default form submission
        event.preventDefault();
        
        // Get form values
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let subject = document.getElementById('subject').value;
        let message = document.getElementById('message').value;
        
        // Create data object
        let formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };
        
        // Show loading status
        showStatus('Sending your message...', 'info');
        
        // Send the data to the server
        sendFormData(formData);
    });
});

// Function to send form data to the server
function sendFormData(formData) {
    // Define the server URL
    // let serverUrl = 'http://localhost:3000/submit-form'; 
    let serverUrl = 'https://nodeemailhandler.onrender.com/submit-form'; // adjust with your app name
    
    // Create fetch options
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    };
    
    // Use fetch API to send the data
    fetch(serverUrl, fetchOptions)
        .then((response) => {
            // Check if the response is ok
            if (response.ok) {
                return response.json();
            } else {
                // If response is not ok, throw an error
                throw new Error('Server response was not OK');
            }
        })
        .then((data) => {
            // Handle successful response
            if (data.success) {
                showStatus('Your message has been sent successfully!', 'success');
                resetForm();
            } else {
                showStatus('Failed to send your message. ' + data.message, 'error');
            }
        })
        .catch((error) => {
            // Handle errors
            console.error('Error:', error);
            showStatus('An error occurred. Please try again later.', 'error');
        });
}

// Function to show status messages
function showStatus(message, type) {
    let statusElement = document.getElementById('statusMessage');
    
    // Remove any existing status classes
    statusElement.classList.remove('success', 'error', 'info');
    
    // Add appropriate class based on message type
    if (type === 'success') {
        statusElement.classList.add('success');
    } else if (type === 'error') {
        statusElement.classList.add('error');
    }
    
    // Set the message text
    statusElement.textContent = message;
}

// Function to reset the form
function resetForm() {
    document.getElementById('contactForm').reset();
}
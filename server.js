// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const nodemailer = require('nodemailer');

// Define server port
const PORT = process.env.PORT || 3000;

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Parse the request URL
  let parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  
  // Handle CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }
  
  // Handle form submission endpoint
  if (pathname === '/submit-form' && req.method === 'POST') {
    let body = '';
    
    // Collect data chunks
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    // Process the complete request body
    req.on('end', () => {
      try {
        // Parse the form data
        let formData = JSON.parse(body);
        
        // Send email with the form data
        sendEmail(formData, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Failed to send email' }));
          } else {
            console.log('Email sent:', info.response);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Email sent successfully' }));
          }
        });
      } catch (err) {
        console.error('Error processing form data:', err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: 'Invalid form data' }));
      }
    });
  } 
  // Serve static files from the frontend directory
  else {
    // Default to index.html if no path is specified
    if (pathname === '/') {
      pathname = '/index.html';
    }
    
    // Determine the file path
    let filePath = path.join(__dirname, '../frontend', pathname);
    
    // Read the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // File not found
        res.statusCode = 404;
        res.end('File not found');
        return;
      }
      
      // Determine content type based on file extension
      let ext = path.extname(filePath);
      let contentType = 'text/html';
      
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.js') contentType = 'text/javascript';
      
      // Serve the file
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  }
});

// Function to send email using nodemailer
function sendEmail(formData, callback) {
  // Create a transporter object
  let transporter = nodemailer.createTransport({
    service: 'gmail',  // You can change this to another email service
    auth: {
      user: 'your-email@gmail.com',  // Your email address
      pass: 'your-app-password'      // Your email password or App Password
    }
  });
  
  // Construct email content
  let emailContent = 'New Form Submission:\n\n';
  for (let key in formData) {
    emailContent += key + ': ' + formData[key] + '\n';
  }
  
  // Setup email data
  let mailOptions = {
    from: 'your-email@gmail.com',          // Sender address
    to: 'recipient-email@example.com',      // List of recipients
    subject: 'New Form Submission',         // Subject line
    text: emailContent                      // Plain text body
  };
  
  // Send mail with defined transport object
  transporter.sendMail(mailOptions, callback);
}

// Start the server
server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
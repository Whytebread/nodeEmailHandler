![image](https://github.com/PatrickFrankAIU/GradeManagerProject/assets/134087916/b5d814bf-e38f-456f-8f9c-cb5a98fb52fa)

This code is NOT configured for deployment (read the file "Notes from Pat (READ FIRST).txt", but if you want to see what the HTML page looks like when deployed, it's hosted on Pages here: 
https://patrickfrankaiu.github.io/nodeEmailHandler/


# Email Form Demo

A simple demonstration of a contact form that sends emails using Node.js.

## Project Structure

```
email-form-demo/
  ├── frontend/
  │   ├── index.html
  │   ├── main.css
  │   └── main.js
  ├── server/
  │   ├── server.js
  │   └── package.json
  └── README.md
```

## Setup Instructions

### 1. Install Node.js

Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Install Dependencies

Navigate to the server directory and run:

```
cd server
npm install
```

### 3. Configure Email Settings

Edit the `server.js` file to update the email configuration:

- Replace `'your-email@gmail.com'` with your Gmail address
- Replace `'your-app-password'` with your Gmail app password
- Replace `'recipient-email@example.com'` with the email where you want to receive form submissions

**Note:** For Gmail, you'll need to use an "App Password" instead of your regular password. To create an App Password:
1. Enable 2-Step Verification in your Google Account
2. Visit [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"

### 4. Start the Server

In the server directory, run:

```
npm start
```

This will start the server at http://localhost:3000

### 5. Open the Website

Open your browser and navigate to http://localhost:3000 to see the contact form.

## How It Works

1. The frontend HTML form collects user data
2. JavaScript sends this data to the Node.js server via fetch API
3. The server processes the data and sends an email using Nodemailer
4. The server returns success/error status to the frontend
5. The frontend displays a status message to the user

## Customization

- Modify `index.html` to change the form fields
- Update `main.css` to change the styling
- Edit `main.js` to add form validation or change submission behavior
- Update `server.js` to change server behavior or email format

## For Educational Purposes

This demo is intentionally simple and follows specific coding guidelines for educational purposes. In a production environment, consider:

- Adding more robust error handling
- Implementing CSRF protection
- Using environment variables for sensitive information
- Adding rate limiting to prevent abuse

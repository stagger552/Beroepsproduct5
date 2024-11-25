const express = require('express');
const app = express();
const ttn = require('ttn');
const WebSocket = require('ws');
const http = require('http');

const i18n = require('i18n');
require('dotenv').config();

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// TTN configuration
const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;
const ttnClient = new ttn.DataClient(appID, accessKey, 'eu1.cloud.thethings.network');

// WebSocket connections
const clients = new Set();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  clients.add(ws);
  
  ws.on('close', () => {
    clients.delete(ws);
  });
});

// Function to send data to all connected WebSocket clients
function broadcastToClients(data) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Listen for uplink messages from TTN
ttnClient.on('uplink', function (devID, payload) {
  console.log('Received uplink from ', devID);
  console.log(payload);
  
  // Broadcast the received data to all connected clients
  broadcastToClients({ type: 'uplink', devID, payload });
});

// Start the TTN client
ttnClient.start();


app.get('/lang/:lang', (req, res) => {
  const lang = req.params.lang;
  i18n.setLocale(lang);
  res.render('index', { title: 'Home' });
});

// Routes
app.get('/', (req, res) => {
    const title = 'Home';
  
    // Render the index.ejs view with the title
    res.render('index', { title });
  });
  
  app.get('/api/getDashboard', (req, res) => {
    const title = 'Dashboard';
  
    // Render the dashboard.ejs view with the title
    res.render('dashboard', { title });
  });
  
  app.get('/api/getDashboard', (req, res) => {
    const title = 'Analytics';
  
    // Render the analytics.ejs view with the title
    res.render('analytics', { title });
  });
  
  // Add a new endpoint for OpenAI API requests
  app.post('/api/callOpenAI', async (req, res) => {
    const { prompt, context } = req.body; // Expecting prompt and context in the request body
    const OpenAIapiKey = process.env.OPENAI_API_KEY; // Use the API key from the environment variable

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OpenAIapiKey}`
    };
    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: context },
        { role: "user", content: prompt }
      ]
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data.choices[0].message.content); // Send the AI response back to the client
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      res.status(500).json({ error: "Error calling OpenAI API" });
    }
  });

  // Start server
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

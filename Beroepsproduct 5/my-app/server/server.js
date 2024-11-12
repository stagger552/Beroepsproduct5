const express = require('express');
const app = express();

const i18n = require('i18n');

// Set up i18n
i18n.configure({
  locales: ['en', 'fr', 'es'],
  directory: './locales',
  defaultLocale: 'en'
});

// Set up server-side rendering
app.set('view engine', 'ejs');
app.set('views', './views');



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
    const OpenAIapiKey = "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"; // Move this to a secure location in production

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

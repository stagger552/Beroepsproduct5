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
  
  app.get('/dashboard', (req, res) => {
    const title = 'Dashboard';
  
    // Render the dashboard.ejs view with the title
    res.render('dashboard', { title });
  });
  
  app.get('/analytics', (req, res) => {
    const title = 'Analytics';
  
    // Render the analytics.ejs view with the title
    res.render('analytics', { title });
  });
  
  // Start server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

const express = require('express');
const path = require('path');
const app = express();

// Akses file statis di public/
app.use(express.static('public'));

// Buka akses Bootstrap dari node_modules
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

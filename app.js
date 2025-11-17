const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();

// middleware untuk parsing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session sederhana
app.use(session({
  secret: 'behealthy-secret-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));


const USERS_FILE = path.join(__dirname, 'data', 'users.json');

function loadUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function saveUsers(users) {
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Gagal menyimpan users:', err);
  }
}

// Root - tetap kirim index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// middleware untuk melindungi route yang memerlukan login
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.redirect('/login.html');
}

// Protected pages - hanya bisa diakses jika login
app.get('/toko', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'toko', 'toko.html'));
});
app.get('/toko/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'toko', 'toko.html'));
});

app.get('/forum', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});
app.get('/forum/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});

app.get('/kesehatan', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'kesehatan_mandiri', 'kesehatan.html'));
});
app.get('/kesehatan/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'kesehatan_mandiri', 'kesehatan.html'));
});

// Protected subpages for toko
app.get('/toko/cart.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'toko', 'cart.html'));
});

app.get('/toko/product.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'toko', 'product.html'));
});

// Protected subpages for kesehatan_mandiri
const kesehatanPages = ['bmi.html','depresi.html','diabetes.html','jantung.html','stress.html'];
kesehatanPages.forEach(p => {
  app.get(`/kesehatan/${p}`, requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'kesehatan_mandiri', p));
  });
});

// Forum main and html
app.get('/forum.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});

// Now serve static assets (CSS, images, JS routes). This is placed after protected routes
app.use(express.static('public'));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// Serve client-side route scripts stored in the repo `routes/` folder
app.use('/routes', express.static(path.join(__dirname, 'routes')));

// Register handler
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) return res.redirect('/register.html');

  const users = loadUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    // email sudah terdaftar
    console.log('[REGISTER] attempt with existing email:', email);
    return res.redirect('/register.html');
  }

  const hash = bcrypt.hashSync(password, 8);
  const user = { id: Date.now(), name, email: email.toLowerCase(), passwordHash: hash };
  users.push(user);
  saveUsers(users);

  console.log('[REGISTER] new user:', email);

  // set session dan redirect ke halaman utama
  req.session.userId = user.id;
  res.redirect('/');
});

// Login handler
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.redirect('/login.html');

  const users = loadUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    console.log('[LOGIN] failed - user not found:', email);
    return res.redirect('/login.html');
  }

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) {
    console.log('[LOGIN] failed - invalid password for:', email);
    return res.redirect('/login.html');
  }

  console.log('[LOGIN] success for:', email);
  req.session.userId = user.id;
  res.redirect('/');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
});

// API untuk mengetahui informasi session user saat ini
app.get('/api/session', (req, res) => {
  const users = loadUsers();
  if (!req.session || !req.session.userId) return res.json({ user: null });
  const user = users.find(u => u.id === req.session.userId);
  if (!user) return res.json({ user: null });
  // jangan kirim passwordHash
  const { passwordHash, ...publicUser } = user;
  res.json({ user: publicUser });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

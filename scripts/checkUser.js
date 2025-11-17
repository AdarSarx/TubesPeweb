const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const [,, email, password] = process.argv;
if (!email || !password) {
  console.error('Usage: node scripts/checkUser.js email@example.com password');
  process.exit(1);
}

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');
let users = [];
try {
  users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8') || '[]');
} catch (e) {
  console.error('Cannot read users file', e.message);
  process.exit(1);
}

const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
if (!user) {
  console.error('User not found');
  process.exit(2);
}

const ok = bcrypt.compareSync(password, user.passwordHash);
if (ok) console.log('Password OK for', user.email);
else console.log('Password NOT match for', user.email);

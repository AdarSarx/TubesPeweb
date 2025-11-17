const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const [,, name, email, password] = process.argv;
if (!name || !email || !password) {
  console.error('Usage: node scripts/addUser.js "Full Name" email@example.com password');
  process.exit(1);
}

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');
let users = [];
try {
  users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8') || '[]');
} catch (e) {
  users = [];
}

if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
  console.error('Error: email already registered');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 8);
const user = { id: Date.now(), name, email: email.toLowerCase(), passwordHash: hash };
users.push(user);
fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
console.log('User added:', user.email);

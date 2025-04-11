const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // database.js dosyasını içe aktar

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// 👉 Kayıt endpoint’i
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(query, [username, password], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint")) {
        res.status(400).json({ message: "Bu kullanıcı adı zaten kayıtlı." });
      } else {
        res.status(500).json({ message: "Kayıt sırasında hata oluştu." });
      }
    } else {
      res.status(200).json({ message: "Kayıt başarılı" });
    }
  });
});

// 👉 Giriş endpoint’i
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.get(query, [username, password], (err, row) => {
    if (err) {
      res.status(500).json({ message: "Sunucu hatası" });
    } else if (row) {
      res.status(200).json({ message: "Giriş başarılı" });
    } else {
      res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});

const sqlite3 = require('sqlite3').verbose();

// Veritabanı dosyasını oluştur (veya varsa aç)
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err.message);
  } else {
    console.log('✅ Veritabanı bağlantısı başarılı');
  }
});

// Kullanıcılar tablosunu oluştur (eğer yoksa)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

module.exports = db;

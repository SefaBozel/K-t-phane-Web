const mysql = require('mysql');

// Veritabanı bağlantısı
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'DESKTOP-S59HMG2\sefa_',
    password: '',
    database: 'Kütüphane_Otomasyonu'
});

// Bağlantıyı aç
connection.connect((err) => {
    if (err) throw err;
    console.log('Veritabanına başarıyla bağlanıldı.');
});
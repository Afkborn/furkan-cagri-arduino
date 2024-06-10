const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db/data.db");

// Veri tabanını oluşturma
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      type TEXT,
      value INTEGER
    )
  `);
});

exports.insertData = (data, callback) => {
  db.run(
    `INSERT INTO data (date, type, value) VALUES (?, ?, ?)`,
    [data.date, data.type, data.value],
    callback
  );
};

// Sıcaklık verisi ekleme
exports.insertTemperature = (temperature) => {
  const date = new Date().toISOString();
  const newData = {
    date,
    type: "temperature",
    value: temperature,
  };

  this.insertData(newData, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// Son sıcaklık verisi alma
exports.getLastTemperature = (callback) => {
  db.get(
    "SELECT * FROM data WHERE type = 'temperature' ORDER BY id DESC LIMIT 1",
    (err, row) => {
      if (err) {
        callback(err);
        return;
      }

      callback(null, row);
    }
  );
};


// Tüm sıcaklık verilerini alma
exports.getAllTemperature = (callback) => {
  db.all(
    "SELECT * FROM data WHERE type = 'temperature' ORDER BY id DESC",
    (err, rows) => {
      if (err) {
        callback(err);
        return;
      }

      callback(null, rows);
    }
  );
};


// Nem verisi ekleme
exports.insertHumidity = (humidity) => {
  const date = new Date().toISOString();
  const newData = {
    date,
    type: "humidity",
    value: humidity,
  };

  this.insertData(newData, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

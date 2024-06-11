const e = require("express");

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

// Son nem verisi alma
exports.getLastHumidity = (callback) => {
  db.get(
    "SELECT * FROM data WHERE type = 'humidity' ORDER BY id DESC LIMIT 1",
    (err, row) => {
      if (err) {
        callback(err);
        return;
      }

      callback(null, row);
    }
  );
}

// Son gaz verisi alma
exports.getLastGas = (callback) => {
  db.get(
    "SELECT * FROM data WHERE type = 'gas' ORDER BY id DESC LIMIT 1",
    (err, row) => {
      if (err) {
        callback(err);
        return;
      }

      callback(null, row);
    }
  );
}

// Son alev verisi alma
exports.getLastFlame = (callback) => {
  db.get(
    "SELECT * FROM data WHERE type = 'flame' ORDER BY id DESC LIMIT 1",
    (err, row) => {
      if (err) {
        callback(err);
        return;
      }

      callback(null, row);
    }
  );
}

// Son su verisi alma
exports.getLastWater = (callback) => {
  db.get(
    "SELECT * FROM data WHERE type = 'water' ORDER BY id DESC LIMIT 1",
    (err, row) => {
      if (err) {
        callback(err);
        return;
      }

      callback(null, row);
    }
  );
}


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

// gaz verisi ekleme
exports.insertGas = (gas) => {
  const date = new Date().toISOString();
  const newData = {
    date,
    type: "gas",
    value: gas,
  };

  this.insertData(newData, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// flame verisi ekleme
exports.insertFlame = (flame) => {
  const date = new Date().toISOString();
  const newData = {
    date,
    type: "flame",
    value: flame,
  };

  this.insertData(newData, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// water verisi ekleme
exports.insertWater = (water) => {
  const date = new Date().toISOString();
  const newData = {
    date,
    type: "water",
    value: water,
  };

  this.insertData(newData, (err) => {
    if (err) {
      console.error(err);
    }
  });
};



// get  last temperature, humidity, gas, flame, water data 
// son sıcaklık, nem, gaz, alev, su verisini al 
exports.getLastSensorData = (callback) => {
  let lastTemp = null;
  let lastHum = null;
  let lastGas = null;
  let lastFlame = null;
  let lastWater = null;

  this.getLastTemperature((err, data) => {
    if (err) {
      callback(err);
      return;
    }

    lastTemp = data;
    this.getLastHumidity((err, data) => {
      if (err) {
        callback(err);
        return;
      }

      lastHum = data;
      this.getLastGas((err, data) => {
        if (err) {
          callback(err);
          return;
        }

        lastGas = data;
        this.getLastFlame((err, data) => {
          if (err) {
            callback(err);
            return;
          }

          lastFlame = data;
          this.getLastWater((err, data) => {
            if (err) {
              callback(err);
              return;
            }

            lastWater = data;
            callback(null, {
              temperature: lastTemp,
              humidity: lastHum,
              gas: lastGas,
              flame: lastFlame,
              water: lastWater,
            });
          });
        });
      });
    });
  });

};

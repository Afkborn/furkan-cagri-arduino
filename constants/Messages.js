exports.TEMPERATURE_REQUIRED = "Sıcaklık değeri gereklidir";
exports.INVALID_TEMPERATURE = "Geçersiz sıcaklık değeri";
exports.TEMPERATURE_SET = "Sıcaklık değeri ayarlandı, sıcaklık: ";
exports.TEMPERATURE_HIGH_NOTIFICATION = (sicaklik) =>
  `Sıcaklık yüksek, sıcaklık: ${sicaklik} derece`;
exports.TEMPERATURE_LOW_NOTIFICATION = (sicaklik) =>
  `Sıcaklık düşük, sıcaklık: ${sicaklik} derece`;

exports.HUMIDITY_REQUIRED = "Nem değeri gereklidir";
exports.INVALID_HUMIDITY = "Geçersiz nem değeri";
exports.HUMIDITY_SET = "Nem değeri ayarlandı, nem: ";
exports.HUMIDITY_HIGH_NOTIFICATION = (nem) => `Nem yüksek, nem: ${nem} derece`;
exports.HUMIDITY_LOW_NOTIFICATION = (nem) => `Nem düşük, nem: ${nem} derece`;

exports.GAS_HIGH_NOTIFICATION = `Gaz algılandı.`;
exports.FLAME_HIGH_NOTIFICATION = `Alev algılandı`;
exports.WATER_HIGH_NOTIFICATION = `Su algılandı, DİKKAT!!!`;

exports.VALUE_REQUIRED = "Değerler gereklidir";
exports.INVALID_VALUE = "Geçersiz değerler, lütfen kontrol edin";
exports.VALUE_SET = `değerler ayarlandı`;

exports.INTERNAL_SERVER_ERROR = "Sunucu hatası";


exports.ARDUINO_DISCONNECTED = "Arduino bağlantısı kesildi";
exports.ARDUINO_CONNECTED = "Arduino bağlantısı kuruldu";
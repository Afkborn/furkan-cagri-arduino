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

exports.TEMPERATURE_HUMIDITY_REQUIRED = "Sıcaklık ve nem değerleri gereklidir";
exports.INVALID_TEMPERATURE_HUMIDITY = "Geçersiz sıcaklık ve nem değerleri";
exports.TEMPERATURE_HUMIDITY_SET = (sicaklik, nem) =>
  `Sıcaklık ve nem değerleri ayarlandı, sıcaklık: ${sicaklik} C , nem: %${nem}`;
exports.INTERNAL_SERVER_ERROR = "Sunucu hatası";

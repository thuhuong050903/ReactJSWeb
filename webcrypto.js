const { Crypto } = require('@peculiar/webcrypto');

// Ghi đè bộ mã hóa mặc định của Node.js bằng OpenSSL 3.0.8+quic
global.crypto = new Crypto();

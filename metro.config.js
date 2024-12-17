// // metro.config.js
// const { getDefaultConfig } = require('expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
//   ...defaultConfig,
//   server: {
//     // Configuração do proxy para redirecionar para o backend
//     enhanceMiddleware: (middleware) => {
//       return (req, res, next) => {
//         // Adiciona o cabeçalho para permitir CORS
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//         middleware(req, res, next);
//       };
//     },
//   },
// };

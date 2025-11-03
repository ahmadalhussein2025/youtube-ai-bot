const http = require('http');

// خادم بسيط لمنع الإغلاق
const keepAliveServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('YouTube AI Bot is alive! 🚀\n' + new Date().toLocaleString());
});

// استخدام منفذ مختلف عن n8n
const KEEP_ALIVE_PORT = 3001;
keepAliveServer.listen(KEEP_ALIVE_PORT, '0.0.0.0', () => {
  console.log(`🫀 Keep-alive server running on port ${KEEP_ALIVE_PORT}`);
});

// طلب تلقائي كل 5 دقائق
const pingService = async () => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 3000}`);
    console.log('✅ Keep-alive ping:', new Date().toLocaleString());
  } catch (error) {
    console.log('⚠️ Keep-alive ping failed:', error.message);
  }
};

// بدء الطلبات التلقائية بعد 30 ثانية
setTimeout(() => {
  pingService();
  setInterval(pingService, 5 * 60 * 1000); // كل 5 دقائق
}, 30000);

console.log('🚀 Keep-alive system started!');

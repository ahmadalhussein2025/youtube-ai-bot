const http = require('http');
const fetch = require('node-fetch');

console.log('🚀 Starting Enhanced Keep-Alive System...');

// 1. خادم Keep-Alive الأساسي
const keepAliveServer = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache'
    });
    const timestamp = new Date().toLocaleString('ar-EG');
    res.end(`🫀 YouTube AI Bot - Active\n⏰ ${timestamp}\n✅ All systems operational`);
});
keepAliveServer.listen(3001, '0.0.0.0', () => {
    console.log('🔧 Keep-alive server listening on port 3001');
});

// 2. دالة Ping محسنة
const pingServices = async () => {
    const timestamp = new Date().toLocaleString('ar-EG');
    console.log(`\n🔄 [${timestamp}] Starting ping cycle...`);
    
    const services = [
        { name: 'n8n Main', url: `http://localhost:${process.env.PORT || 3000}` },
        { name: 'Keep-Alive', url: 'http://localhost:3001' }
    ];

    let successCount = 0;
    
    for (const service of services) {
        try {
            const startTime = Date.now();
            const response = await fetch(service.url, {
                method: 'GET',
                timeout: 10000
            });
            const responseTime = Date.now() - startTime;
            
            console.log(`✅ ${service.name}: ${response.status} (${responseTime}ms)`);
            successCount++;
            
        } catch (error) {
            console.log(`❌ ${service.name} failed: ${error.message}`);
        }
    }
    
    console.log(`📊 Ping results: ${successCount}/${services.length} successful`);
    return successCount;
};

// 3. نظام Ping مكثف كل 4 دقائق
console.log('⏰ Starting 4-minute ping intervals...');

// البدء فوري + كل 4 دقائق
setTimeout(() => {
    pingServices();
}, 5000);

setInterval(() => {
    pingServices();
}, 4 * 60 * 1000); // كل 4 دقائق بالضبط

// 4. نظام مراقبة الذاكرة
setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const usedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    
    console.log(`🧠 Memory: ${usedMB}MB - ${new Date().toLocaleTimeString()}`);
}, 60 * 1000);

console.log('🎯 Enhanced Keep-Alive system activated!');

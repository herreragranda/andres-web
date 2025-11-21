#!/usr/bin/env node

/**
 * Servidor de desarrollo local para inyectar variables de entorno
 * 
 * Uso: node dev-server.js
 * 
 * Lee .env.local y sirve los archivos reemplazando ${VARIABLE}
 * por sus valores en env-config.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de .env.local
const envPath = path.join(__dirname, '.env.local');
let envVars = {};

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envVars = dotenv.parse(envContent);
    console.log('✓ Variables de entorno cargadas desde .env.local');
} else {
    console.warn('⚠️ Archivo .env.local no encontrado. Crea uno basado en .env.example');
}

const PORT = process.env.PORT || 8000;
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Prevenir directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.statusCode = 403;
        res.end('Acceso denegado');
        return;
    }

    // Si es un directorio, servir index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    // Leer archivo
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.statusCode = 404;
            res.contentType = 'text/html; charset=utf-8';
            res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>404 Not Found</title></head>
                <body>
                    <h1>404 Not Found</h1>
                    <p>${filePath} no existe</p>
                </body>
                </html>
            `);
            console.log(`✗ 404: ${req.url}`);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Si es env-config.js, reemplazar variables
        if (filePath.endsWith('env-config.js')) {
            let processedContent = content.toString();
            
            // Reemplazar ${VARIABLE} por su valor o cadena vacía
            Object.entries(envVars).forEach(([key, value]) => {
                processedContent = processedContent.replace(
                    new RegExp(`\\$\\{${key}\\}`, 'g'),
                    value || ''
                );
            });

            // Reemplazar cualquier variable no encontrada con cadena vacía
            processedContent = processedContent.replace(
                /\$\{[A-Z_]+\}/g,
                ''
            );

            res.setHeader('Content-Type', contentType);
            res.end(processedContent);
            console.log(`✓ GET: ${req.url}`);
            return;
        }

        res.setHeader('Content-Type', contentType);
        res.end(content);
        console.log(`✓ GET: ${req.url}`);
    });
});

server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║  Servidor de Desarrollo                                 ║
╠══════════════════════════════════════════════════════════╣
║  🚀 http://localhost:${PORT}                              ║
║                                                          ║
║  Variables de entorno inyectadas desde: .env.local      ║
╚══════════════════════════════════════════════════════════╝
    `);
});

// Manejar Ctrl+C
process.on('SIGINT', () => {
    console.log('\n\n🛑 Servidor detenido');
    process.exit(0);
});

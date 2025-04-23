const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración avanzada de almacenamiento
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const entityType = file.fieldname == 'avatar' ? 'users' : 'products';
        const basePath = 'public/images';
        const fullPath = path.join(basePath, entityType);
        
        // Crear directorio si no existe
        fs.mkdirSync(fullPath, { recursive: true });
        
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter(req, file, cb) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido'));
        }
    }
});

module.exports = upload;
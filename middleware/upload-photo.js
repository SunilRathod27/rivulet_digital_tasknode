const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploadImages',
    filename: (req, file, cb) => {  
        const name = Date.now() + '_' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({
    storage : storage
}).single("photo");

module.exports = upload;
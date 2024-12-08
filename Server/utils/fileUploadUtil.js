const multer = require('multer');
const fs = require("fs");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads");
        }
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({ storage: storage });
module.exports = upload;

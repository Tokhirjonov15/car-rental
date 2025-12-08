import path from "path";
import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

function getTargetImageStorage(address: string) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join(process.cwd(), "uploads", address);

            // papkani avtomatik yaratadi
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            const randomName = uuidv4() + extension;
            cb(null, randomName);
        },
    });
}

const makeUploader = (address: string) => {
    return multer({ storage: getTargetImageStorage(address) });
};

export default makeUploader;

/*
   const product_storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, "./uploads/products");
    },
    filename: function (req, file, cb) {
        console.log(file);
        const extension = path.parse(file.originalname).ext;
        const random_name = v4() + extension;
        cb(null, random_name);
    },
});

export const uploadProductImage = multer({storage: product_storage});
*/
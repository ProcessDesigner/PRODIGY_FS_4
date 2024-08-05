import multer from "multer";
import path from "path"
const upload = multer({
    dest:"uploads/",
    limit:{fileSize:50*1024*1024},
    storage:multer.diskStorage({
        destination:"uploads/",
        fileName:(_req,file,cb)=>{
            cb(null,file.originalname);
        },

    }),
    fileFilter:(_req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(
            ext!==".jpg" &&
            ext!==".jpeg" &&
            ext!==".webp" &&
            ext!==".png" &&
            ext!==".mp4" 
        ){
            cb(new Error(`Unsuppported file type! ${ext}`),false);
            return;

        }
        cb(null,true)

    },

    
});

export default upload;
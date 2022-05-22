const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('config')
const ACCESSKEY = config.get("ACCESSKEY")
const SECRETKEY = config.get("SECRETKEY")
const REGION = config.get("REGION")
aws.config.update({
    accessKeyId: ACCESSKEY,
    secretAccessKey:SECRETKEY,
    region: REGION
})

const s3 = new aws.S3();

const fileFilter = (req, file , cb) => {
    if(file.mimetype === 'image/jpeg' || 
       file.mimetype === 'image/png' || 
       file.mimetype === 'image/jpg') {
           cb(null , true)
       } else {
           cb(null , false)
       }
  }

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'project-basic',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function(req, file , cb) {
            cb(null , {fieldName : file.fieldname , fileName : file.originalname})
        },

        key : function (req, file , cb) {
            cb(null , Date.now().toString() + '-' + file.originalname)
        },

        
    }),

    fileFilter: fileFilter,

    limits : {fileSize : 2000000} //2 mb
})



module.exports = upload
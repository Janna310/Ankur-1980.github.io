const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Env = require("./s3.env");

aws.config.update({
  secretAccessKey: s3Env.AWS_SECRET_KEY,
  accessKeyId: s3Env.AWS_ACCESS_KEY,
  region: s3Env.REGION,
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type, only JPEG and PNG"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "gcproject",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: "testing meta data" });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;

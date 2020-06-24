const imgRouter = require("express").Router();
const upload = require("../services/image-upload");

const singleUpload = upload.single("image");

imgRouter.post("/", (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).json({ message: err.message });
    }
    console.log("helper", req.file);

    return res.json({ imgURL: req.file.location, imgKey: req.file.key });
  });
});

module.exports = imgRouter;

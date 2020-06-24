const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // console.log("verify", req.headers.authorization);

  if (!req.headers.authorization) {
    return res
      .status(401)
      .send("Unauthorized Request: No Authorization in headers");
  }
  let token = req.headers.authorization.split(" ")[0];
  // console.log("token", token);

  if (token === "null") {
    // console.log("if working?");

    return res.status(401).send("Unauthorized request: No Token");
  }

  // let payload = jwt.verify(token, "secretKey", (err, decoded) => {
  //   console.log("err", err);
  //   console.log("decoded", decoded);
  // });

  let payload;
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      payload = decoded;
    }
  });

  // console.log("payload", payload);
  if (!payload) {
    return res.status(401).send("Unauthorized request: Paylod Broken");
  }

  req.userId = payload.sub;
  next();
};

module.exports = verifyToken;

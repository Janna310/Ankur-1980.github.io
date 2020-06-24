const users = require("express").Router();
const database = require("../services/aws_connection");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../services/verifyToken");

// get logged in user
users.get("/", verifyToken, (req, res) => {
  database
    .query("SELECT * FROM users WHERE user_id = $1::UUID", [req.userId])
    .then((response) => {
      res.status(200).json({ message: "Users Fetched", users: response.rows });
    });
});

users.get("/pic", verifyToken, (req, res) => {
  database
    .query("SELECT picture FROM users WHERE user_id = $1", [req.userId])
    .then((response) => {
      res.status(200).json({ message: "User pic fetched", pic: response.rows });
    });
});

users.post("/register", async (req, res) => {
  console.log("server", req.body);
  const {
    firstName,
    lastName,
    userName,
    age,
    email,
    password,
    bio,
    picture,
  } = req.body;

  database.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (err, response) => {
      if (err) {
        throw err;
      }
      console.log(response.rows);

      if (response.rows.length > 0) {
        res
          .status(422)
          .json({ message: "email already exists", goodToGo: false });
      } else {
        database.query(
          `INSERT INTO users (user_id, first_name, last_name, username, email, password, bio, age, picture) VALUES (uuid_generate_v4(), $1::text, $2::text,$3::text, $5::text, $6::text, $7::text, $4::int, $8::text) RETURNING user_id, password`,
          [firstName, lastName, userName, age, email, password, bio, picture],
          (err, response) => {
            if (err) {
              throw err;
            }
            const user = response.rows[0];

            const token = jwt.sign(
              { sub: user.user_id, username: user.username },
              "secretKey",
              { expiresIn: "2h" }
            );
            // console.log(response.rows);
            // res.status(200).send({ token });
            res.status(200).json({
              message: "You successfully registered, please log in",
              goodToGo: true,
              token,
            });
          }
        );
      }
    }
  );
});

// login in
users.post("/login", (req, res) => {
  console.log("login", req.body);
  const { userName, password } = req.body;

  database
    .query("SELECT * FROM users WHERE userName = $1", [userName])
    .then((response) => {
      const user = response.rows[0];
      // console.log("user", user);
      // console.log("rows", response.rows);
      if (response.rows.length <= 0) {
        res.status(404).json({
          message: "username not found",
          goodToGo: false,
          user,
        });
        return;
      } else if (user.password != password) {
        res.status(404).json({
          message: "password incorrect",
          goodToGo: false,
          user,
        });
      } else {
        console.log("user", user.username);
        const payload = { sub: user.user_id, username: user.username };
        const token = jwt.sign(payload, "secretKey", { expiresIn: "2h" });
        res.status(200).json({
          message: "login successful",
          goodToGo: true,
          token,
        });
      }
    });
});

module.exports = users;

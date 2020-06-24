const favorites = require("express").Router();
const database = require("../services/aws_connection");
const verifyToken = require("../services/verifyToken");

// get items for specific user
favorites.get("/", verifyToken, (req, res) => {
  // console.log("userid", req.userId);
  database
    .query("SELECT * FROM favorites WHERE user_id = $1", [req.userId])
    .then((result) => {
      res.status(200).json({ message: "Fetched Items", items: result.rows });
    });
});

favorites.post("/", verifyToken, (req, res) => {
  // console.log("req.userid", req.userId);
  const { info, category } = req.body;
  database
    .query(
      "INSERT INTO favorites (fav_info, fav_cat, user_id) VALUES($1::text, $2::text, $3::uuid)",
      [info, category, req.userId]
    )
    .then(() => {
      database
        .query("SELECT * FROM favorites WHERE user_id = $1", [req.userId])
        .then((response) => {
          res.status(201).json({ message: "Item Added", items: response.rows });
        });
    });
});

favorites.delete("/:id", (req, res) => {
  database
    .query(`DELETE FROM favorites WHERE fav_id=$1::INT`, [req.params.id])
    .then(() => {
      database.query("SELECT * FROM favorites").then((response) => {
        res.status(200).json({ message: "Item Deleted", items: response.rows });
      });
    });
});

module.exports = favorites;

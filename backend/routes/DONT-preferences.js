const preferences = require("express").Router();
const database = require("../services/connection");
const verifyToken = require("../services/verifyToken");

// get items for specific user
preferences.get("/", verifyToken, (req, res) => {
  // console.log("userid", req.userId);

  database
    .query("SELECT * FROM preferences WHERE user_id = $1", [req.userId])
    .then((result) => {
      res.status(200).json({ message: "Fetched Items", items: result.rows });
    });
});

preferences.post("/", verifyToken, (req, res) => {
  // console.log("req.userid", req.userId);
  const { info, category } = req.body;
  database
    .query(
      "INSERT INTO preferences (preference_info, preference_cat, user_id) VALUES($1::text, $2::text, $3::uuid)",
      [info, category, req.userId]
    )
    .then(() => {
      database
        .query("SELECT * FROM preferences WHERE user_id = $1", [req.userId])
        .then((response) => {
          res.status(201).json({ message: "Item Added", items: response.rows });
        });
    });
});

preferences.delete("/:id", (req, res) => {
  database
    .query(`DELETE FROM preferences WHERE preference_id=$1::INT`, [
      req.params.id,
    ])
    .then(() => {
      database.query("SELECT * FROM preferences").then((response) => {
        res.status(200).json({ message: "Item Deleted", items: response.rows });
      });
    });
});

module.exports = preferences;

// preferences.get("/home-bar", (req, res) => {
//   database
//     .query("SELECT * FROM preferences WHERE preference_cat = 'home_bar'")
//     .then((result) => {
//       res.status(200).json({ message: "Fetched Items", items: result.rows });
//     });
// });

// preferences.get("/locations", (req, res) => {
//   database
//     .query("SELECT * FROM preferences WHERE preference_cat = 'places'")
//     .then((result) => {
//       res.status(200).json({ message: "Fetched Items", items: result.rows });
//     });
// });

// preferences.get("/bartenders", (req, res) => {
//   database
//     .query("SELECT * FROM preferences WHERE preference_cat = 'bartenders'")
//     .then((result) => {
//       res.status(200).json({ message: "Fetched Items", items: result.rows });
//     });
// });

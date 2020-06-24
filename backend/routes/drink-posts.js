const drinkPosts = require("express").Router();
const database = require("../services/aws_connection");
const upload = require("../services/image-upload");
const verifyToken = require("../services/verifyToken");

const singleUpload = upload.single("image");

// all posts
drinkPosts.get("/", (req, res) => {
  database
    .query("SELECT * FROM drink_posts ORDER BY date_added DESC")
    .then((response) => res.status(200).json(response.rows));
});

// only logged in users posts
drinkPosts.get("/users", verifyToken, (req, res) => {
  console.log(req.userId);

  database
    .query(
      "SELECT * FROM drink_posts WHERE user_id = $1 ORDER BY date_added DESC",
      [req.userId]
    )
    .then((response) => {
      res
        .status(200)
        .json({ message: "User Posts Fetched", items: response.rows });
    });
});

// logged in user post
drinkPosts.post("/users", verifyToken, (req, res) => {
  const {
    name,
    rating,
    glassware,
    description,
    location,
    imageLocation,
    dateAdded,
    username,
  } = req.body;

  database
    .query(
      "INSERT INTO drink_posts (post_id, drink_name, rating, glassware, description, location, image_location, date_added, user_id, username) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        name,
        rating,
        glassware,
        description,
        location,
        imageLocation,
        dateAdded,
        req.userId,
        username,
      ]
    )
    .then(() => {
      database
        .query(
          "SELECT * FROM drink_posts WHERE user_id = $1 ORDER BY date_added DESC",
          [req.userId]
        )
        .then((response) => {
          res.status(201).json({ message: "Post added", items: response.rows });
        });
    });
});

drinkPosts.delete("/:id", verifyToken, (req, res) => {
  // console.log("params", req.params.id);

  database
    .query("DELETE FROM drink_posts WHERE post_id = $1", [req.params.id])
    .then(() => {
      database
        .query("SELECT * FROM drink_posts WHERE user_id = $1", [req.userId])
        .then((response) => {
          res
            .status(201)
            .json({ message: "Post Deleted", items: response.rows });
        });
    });
});

// image upload
drinkPosts.post("/images", (req, res) => {
  console.log("working?");
  console.log("req", req.file);
  console.log("req.body", req.body);

  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).json({ message: err.message });
    }

    return res.json({ imgURL: req.file.location, imgKey: req.file.key });
  });
});
// nothing of importance

module.exports = drinkPosts;

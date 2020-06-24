const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const recipes = require("./routes/recipes");
const users = require("./routes/users");
// const preferences = require("./routes/preferences");
const drinkPosts = require("./routes/drink-posts");
const favorites = require("./routes/favorites");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});
// things coming from front end will be secure
app.use(express.urlencoded({ extended: false }));
// be able to read json
app.use(express.json());

app.use(express.static(__dirname + "/public"));

// where to send information from the front end to the back end
app.use("/api/users", users);
app.use("/api/recipes", recipes);
// app.use("/api/preferences", preferences);
app.use("/api/drink-posts", drinkPosts);
app.use("/api/favorites", favorites);

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

// starting the server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

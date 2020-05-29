var session = require("express-session");
var Keycloak = require("keycloak-connect");
const express = require("express");
const cors = require("cors");

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

var app = express();

app.use(cors());

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(keycloak.middleware());

app.get("/public-backend", (req, res) => {
  console.log("In public backend");
  res.status(200).json({
    message: "public route",
  });
});

app.get("/secured-backend", keycloak.protect(), (req, res) => {
  console.log("In secured backend");
  res.status(200).json({
    message: "secured route",
  });
});

app.listen("4000", () => {
  console.log("App is running on port 4000");
});

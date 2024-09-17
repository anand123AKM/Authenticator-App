const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secret";

app.get("/", (req, res) => {
  res.json({
    text: "api works",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "AKM",
    email: "akm@gmail.com",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "3000s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      console.log(err);
      res.send({ result: "invalid token" });
    } else {
      res.json({
        message: "Profile Accessed",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({ result: "Token not found" });
  }
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

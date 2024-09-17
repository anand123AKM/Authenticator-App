import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const secretKey = "your_secret_key";

app.use(bodyParser.json());
app.use(cors());

app.post("/login", (req, res) => {
  const { phone, name, age, email } = req.body;
  const user = {
    id: 1,
    phone,
    name,
    age,
    email,
  };

  jwt.sign({ user }, secretKey, { expiresIn: "3000s" }, (err, token) => {
    if (err) {
      res.status(500).json({ error: "Error generating token" });
    } else {
      res.json({ token });
    }
  });
});

app.post("/profile", (req, res) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, secretKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: "Profile accessed",
          authData,
        });
      }
    });
  } else {
    res.sendStatus(403);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

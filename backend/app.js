const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./db/movieapp-a7969-firebase-adminsdk-9svx8-28f6a5d42f.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

//server app => express
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const port = 4000;

const fs = require("fs");

app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    console.log("Received registration request:", req.body); // Log request body
    const { email, password } = req.body;
    // Logică pentru a salva utilizatorul în Firestore (dacă este necesar)
    res
      .status(200)
      .json({ message: "User registered successfully on the server." });
  } catch (error) {
    console.error("Error during registration on the server:", error);
    res
      .status(500)
      .json({ error: "An error occurred during registration on the server." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password && email.trim() !== "" && password.trim() !== "") {
      res.status(200).json({ message: "Utilizator conectat cu succes!" });
    } else {
      res
        .status(401)
        .json({ error: "Eroare la conectare. Verificați datele introduse." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: "A apărut o eroare la conectare. Încercați din nou." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

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

app.get("/movies", async (req, res) => {
  try {
    const moviesRef = db.collection("movies");
    const snapshot = await moviesRef.get();
    if (snapshot.empty) {
      res.status(404).json({ message: "No movies found." });
      return;
    }

    const movies = [];
    snapshot.forEach((doc) => {
      movies.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "An error occurred while fetching movies." });
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieRef = db.collection("movies").doc(movieId);
    const doc = await movieRef.get();
    if (!doc.exists) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching movie details." });
  }
});

app.get("/comments/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;
    console.log(`Fetching comments for movie ID: ${movieId}`);

    const commentsSnapshot = await db
      .collection("comments")
      .where("movieId", "==", movieId)
      .get();
    if (commentsSnapshot.empty) {
      return res.status(404).json({ error: "No comments found" });
    }

    const comments = [];
    commentsSnapshot.forEach((doc) => {
      comments.push(doc.data());
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/comments/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;
    console.log(`Received POST request for movie ID: ${movieId}`); // Log the movie ID

    const { user, text } = req.body;

    if (!user || !text) {
      return res.status(400).json({ error: "Bad Request: Missing fields" });
    }

    await db.collection("comments").add({
      user,
      text,
      movieId,
      timestamp: new Date().toISOString(),
    });
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

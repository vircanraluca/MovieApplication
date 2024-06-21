const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

const port = 4000;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./db/movieapp-a7969-firebase-adminsdk-9svx8-28f6a5d42f.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const fs = require("fs");

app.post("/register", async (req, res) => {
  try {
    console.log("Received registration request:", req.body);
    const { email, password } = req.body;
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

// Aplică verifyToken pentru rutele care necesită autentificare
app.post("/comments/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;
    console.log(`Received POST request for movie ID: ${movieId}`);

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

app.delete("/comments/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    console.log(`Deleting comment with ID: ${commentId}`);
    await db.collection("comments").doc(commentId).delete();
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/favorites", async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({ error: "Bad Request: Missing fields" });
    }

    const favoriteRef = db.collection("favorites").doc(`${userId}_${movieId}`);
    await favoriteRef.set({
      userId,
      movieId,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ message: "Movie added to favorites successfully" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/favorites/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const favoritesSnapshot = await db
      .collection("favorites")
      .where("userId", "==", userId)
      .get();

    if (favoritesSnapshot.empty) {
      return res.status(404).json({ message: "No favorites found" });
    }

    const favoriteMovies = [];
    const moviePromises = [];

    favoritesSnapshot.forEach((doc) => {
      const movieId = doc.data().movieId;
      moviePromises.push(db.collection("movies").doc(movieId).get());
    });

    const movieDocs = await Promise.all(moviePromises);

    movieDocs.forEach((doc) => {
      if (doc.exists) {
        favoriteMovies.push({ id: doc.id, ...doc.data() });
      }
    });

    res.status(200).json(favoriteMovies);
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = { db };

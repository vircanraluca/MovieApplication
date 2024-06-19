const { db } = require("../app");

async function deleteMovies() {
  try {
    const snapshot = await db.collection("movies").get();
    const batch = db.batch();

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("Deleted all movies successfully");
  } catch (error) {
    console.error("Error deleting movies:", error);
  }
}

deleteMovies();

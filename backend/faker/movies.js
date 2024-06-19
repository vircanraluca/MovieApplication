const { db } = require("../app");
const { faker } = require("@faker-js/faker");

async function addMovieToFirestore(
  title,
  subtitle,
  image,
  description,
  isFavorite
) {
  try {
    const movieJson = {
      title: title,
      subtitle: subtitle,
      image: image,
      description: description,
      isFavorite: isFavorite,
    };

    await db.collection("movies").add(movieJson);
  } catch (error) {
    console.error("Error adding movie document: ", error);
  }
}

async function getExistingUsers() {
  const userSnapshot = await db.collection("users").get();
  const existingUserEmails = userSnapshot.docs.map((doc) => doc.id);

  if (existingUserEmails.length === 0) {
    console.log(
      "No existing users found. Please add users to your Firestore database."
    );
    return [];
  }

  return existingUserEmails;
}

async function generateMovies() {
  const existingUserEmails = await getExistingUsers();

  for (let i = 1; i <= 100; i++) {
    const title = faker.word.words({ count: { min: 1, max: 3 } });
    const subtitle = faker.lorem.sentence();
    const image = faker.image.imageUrl(512, 800, "movie", true);
    const description = faker.lorem.paragraphs({ min: 3, max: 5 });
    const isFavorite = faker.datatype.boolean({ probability: 0.5 });

    await addMovieToFirestore(title, subtitle, image, description, isFavorite);
  }

  console.log("Finished generating movies");
}

generateMovies();

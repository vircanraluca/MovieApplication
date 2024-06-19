const { db } = require("../app");
const { faker } = require("@faker-js/faker");

async function generateUsers() {
  try {
    for (let i = 1; i <= 100; i++) {
      const email = faker.internet.email();
      const password = faker.internet.password(); // Generăm o parolă aleatorie

      const userJson = {
        email: email,
        password: password,
      };

      // Simulăm adăugarea utilizatorului în Firestore
      console.log(`Adding user with email: ${email}`);

      // Într-o implementare reală, folosești db.collection('users').doc(email).set(userJson);
      db.collection("users").doc(email).set(userJson);
    }

    console.log("Finished generating users");
  } catch (error) {
    console.error("Error generating users: ", error);
  }
}

generateUsers();

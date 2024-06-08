<template>
  <div class="login-container">
    <h1>REGISTER HERE</h1>
    <v-img
      src="../assets/popcorn.png"
      alt="GastroDelights Image"
      class="mx-auto"
    />
    <v-sheet class="mx-auto" width="300">
      <v-form class="login-form" fast-fail @submit.prevent>
        <v-text-field
          label="Email"
          required
          v-model="email"
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          label="Password"
          type="password"
          required
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>

        <v-card-actions>
          <v-btn class="mt-2" @click="register">Submit</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <div v-if="errorMessage">{{ errorMessage }}</div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const emailRules = [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ];

    const passwordRules = [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Password must be at least 8 characters",
    ];

    const register = async () => {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        console.log("User registered successfully:", userCredential.user);

        // Faceți solicitarea POST către server
        const response = await fetch("http://localhost:4000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        // Verifică statusul răspunsului
        if (response.ok) {
          console.log("User registered successfully on the server.");
          router.push("/");
        } else {
          console.error("Server registration error:", response.statusText);
          errorMessage.value =
            "An error occurred during registration on the server.";
        }
      } catch (error) {
        console.error("Error during registration:", error);
        errorMessage.value = "An error occurred during registration.";
      }
    };

    return {
      email,
      password,
      errorMessage,
      emailRules,
      passwordRules,
      register,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
}

.v-sheet {
  margin-top: 20px;
}

.v-img {
  width: 250px;
  height: auto;
}

.v-btn {
  background-color: #a52a2a;
  color: white;
  margin-bottom: 100px;
  width: 100%;
  height: 40px;
}
.login-container {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 110vh;
}

.login-form {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

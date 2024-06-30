<template>
  <div class="login-container">
    <h1><span id="bigletter">L</span>ogin Here</h1>
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
          <v-spacer></v-spacer>
          <v-btn class="mt-2" @click="login">LOGIN</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <div v-if="errorMsg">{{ errorMsg }}</div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMsg = ref("");
    const valid = ref(false);

    const router = useRouter();

    const emailRules = [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ];

    const passwordRules = [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Password must be at least 8 characters",
    ];

    const login = async () => {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        const user = userCredential.user;
        console.log("User login successfully:", user);
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        if (user) {
          console.log("User CONNECTED!", user);
          router.push("/");
        } else {
          console.log("Error on login: No valid user received");
        }
      } catch (error) {
        console.error(error.code);
        errorMsg.value = error.message;
      }
    };

    return {
      email,
      password,
      errorMsg,
      valid,
      emailRules,
      passwordRules,
      login,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  font-size: 50px;
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
  background-color: black;
  color: white;
  padding: 1rem;
}

.login-form {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: black;
  color: white;
}
.section4 h1 {
  color: white;
}

#bigletter {
  font-size: 4rem;
  color: red;
}
body {
  background-color: black;
  color: white;
  margin: 0;
  padding: 0;
}
</style>

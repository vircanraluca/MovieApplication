<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer rail app color="black" class="navigation-drawer">
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            class="white--text"
          ></v-list-item>
        </v-list>

        <v-list density="compact" nav>
          <v-list-item
            to="/"
            prepend-icon="mdi-home"
            title="Home"
            value="home"
            class="white--text"
          ></v-list-item>
          <v-list-item
            v-if="!isLoggedIn"
            to="/login"
            prepend-icon="mdi-login"
            title="Login"
            value="login"
            class="white--text"
          ></v-list-item>
          <v-list-item
            v-if="!isLoggedIn"
            to="/register"
            prepend-icon="mdi-account-plus"
            title="Register"
            value="register"
            class="white--text"
          ></v-list-item>
          <v-list-item
            to="/movies"
            prepend-icon="mdi-format-list-bulleted"
            title="Movies"
            value="movies"
            class="white--text"
          ></v-list-item>
          <v-list-item
            v-if="isLoggedIn"
            to="/favorites"
            prepend-icon="mdi-heart"
            title="Favorites"
            value="favorites"
            class="white--text"
          ></v-list-item>

          <v-list-item
            v-if="isLoggedIn"
            prepend-icon="mdi-logout"
            title="Logout"
            @click="handleSignOut"
            value="logout"
            class="white--text"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = getAuth();
    const isLoggedIn = ref(false);
    const router = useRouter();

    auth.onAuthStateChanged((user) => {
      isLoggedIn.value = !!user;
    });

    const handleSignOut = async () => {
      try {
        await signOut(auth);
        isLoggedIn.value = false;
        console.log("User signed out!");
        router.push("/");
      } catch (error) {
        console.error(error.code);
        alert(error.message);
      }
    };

    return {
      isLoggedIn,
      handleSignOut,
    };
  },
};
</script>

<style scoped>
.navigation-drawer {
  background-color: black !important;
}
.white--text {
  color: white !important;
}
.red--icon {
  color: red !important;
}
</style>

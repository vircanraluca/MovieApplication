<template>
  <div>
    <h1>View Your Favorite Movies</h1>
    <v-row dense>
      <v-col v-for="(movie, i) in favoriteMovies" :key="i" cols="12" md="4">
        <v-card class="mx-auto" max-width="380">
          <v-img :src="movie.image" height="200px" cover></v-img>
          <v-card-title class="title">{{ movie.title }}</v-card-title>
          <v-card-subtitle class="subtitle">{{
            movie.subtitle
          }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="red" text @click="goToCommentsPage(movie.id)">
              View Comments
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              :color="movie.isFavorite ? 'red' : 'grey'"
              @click="toggleFavorite(movie)"
            >
              <v-icon>{{
                movie.isFavorite ? "mdi-heart" : "mdi-heart-outline"
              }}</v-icon>
            </v-btn>
            <v-btn
              class="chevron-btn"
              :icon="movie.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="toggleShowDescription(movie)"
            ></v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="movie.show">
              <v-divider></v-divider>
              <v-card-text>{{ movie.description }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      favoriteMovies: [],
      currentUser: null,
    };
  },
  created() {
    this.checkUserAuthentication();
  },
  methods: {
    async fetchFavoriteMovies() {
      try {
        const currentUser = this.currentUser;
        if (!currentUser) {
          console.error("User is not authenticated");
          return;
        }
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        const response = await fetch(
          `http://localhost:4000/favorites/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Initialize show property for each movie and set isFavorite
        this.favoriteMovies = data.map((movie) => ({
          ...movie,
          show: false, // Initialize show property to false
          isFavorite: movie.isFavorite || false, // Assume isFavorite is false if not defined
        }));
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    },
    checkUserAuthentication() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.currentUser = user;
          this.fetchFavoriteMovies();
        } else {
          this.currentUser = null;
          this.$router.push({ name: "Login" });
        }
      });
    },
    goToCommentsPage(movieId) {
      this.$router.push({ name: "Comments", params: { id: movieId } });
    },
    async toggleFavorite(movie) {
      movie.isFavorite = !movie.isFavorite;
      try {
        const response = await fetch(
          `http://localhost:4000/movies/${movie.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isFavorite: movie.isFavorite,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update favorite status");
        }
      } catch (error) {
        console.error("Error updating favorite status:", error);
      }
    },
    toggleShowDescription(movie) {
      // Toggle show property for the clicked movie
      movie.show = !movie.show;
    },
  },
};
</script>
<style scoped>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}
h1 {
  margin-top: 20px;
  margin-bottom: 50px;
  margin-left: 20px;
}
.chevron-btn {
  margin-right: 8px;
}
.v-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.v-card-title,
.v-card-subtitle {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.subtitle {
  min-height: 40px;
}
.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>

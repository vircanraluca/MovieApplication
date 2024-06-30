<template>
  <div class="favorite_section">
    <h1><span id="bigletter">V</span>iew Your Favorite Movies</h1>
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
              icon="mdi-delete-outline"
              @click="deleteFavorite(movie.id)"
            ></v-btn>
            <v-btn
              icon
              :color="isFavorite(movie.id) ? 'red' : 'grey'"
              @click="toggleFavorite(movie)"
            >
              <v-icon>{{
                isFavorite(movie.id) ? "mdi-heart" : "mdi-heart-outline"
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
        this.favoriteMovies = data.map((movie) => ({
          ...movie,
          show: false,
          isFavorite: movie.isFavorite || false,
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
      const currentUser = this.currentUser;
      if (!currentUser) {
        console.error("User is not authenticated");
        return;
      }
      const idToken = await currentUser.getIdToken();
      const isCurrentlyFavorite = this.isFavorite(movie.id);
      try {
        const response = await fetch("http://localhost:4000/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            userId: currentUser.uid,
            movieId: movie.id,
            isFavorite: !isCurrentlyFavorite,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update favorite status");
        }
        if (isCurrentlyFavorite) {
          this.favoriteMovies = this.favoriteMovies.filter(
            (fav) => fav.id !== movie.id
          );
        } else {
          this.favoriteMovies.push(movie);
        }
      } catch (error) {
        console.error("Error updating favorite status:", error);
      }
    },
    async deleteFavorite(movieId) {
      if (!movieId) {
        console.error("Invalid movie ID");
        return;
      }
      try {
        const currentUser = this.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }

        const idToken = await currentUser.getIdToken();
        const response = await fetch(
          `http://localhost:4000/favorites/${currentUser.uid}/${movieId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (response.ok) {
          if (Array.isArray(this.movies)) {
            this.movies = this.movies.filter((movie) => movie.id !== movieId);
          }
          console.log("Favorite movie deleted successfully.");
        } else {
          console.error("Error deleting favorite movie:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting favorite movie:", error);
      }
    },
    isFavorite(movieId) {
      return this.favoriteMovies.some((fav) => fav.id === movieId);
    },
    toggleShowDescription(movie) {
      movie.show = !movie.show;
    },
  },
};
</script>

<style scoped>
body {
  background-color: black;
  color: white;
  margin: 0;
  padding: 0;
}

.favorite_section {
  background-color: black;
  color: white;
  padding: 1rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}
h1 {
  margin-top: 20px;
  margin-bottom: 50px;
  margin-left: 20px;
  font-size: 50px;
  justify-content: center;
  text-align: center;
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

.section4 h1 {
  color: white;
}

#bigletter {
  font-size: 4rem;
  color: red;
}
</style>

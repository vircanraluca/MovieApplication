<template>
  <div>
    <h1>VIEW OUR SELECTION OF MOVIES</h1>
    <v-row dense>
      <v-col v-for="(movie, i) in movies" :key="i" cols="12" md="4">
        <v-card class="mx-auto" max-width="380">
          <v-img :src="movie.image" height="200px" cover></v-img>
          <v-card-title class="title">{{ movie.title }}</v-card-title>
          <v-card-subtitle class="subtitle">{{
            movie.subtitle
          }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="red" text @click="goToCommentsPage(movie.id)"
              >View Comments</v-btn
            >
            <v-spacer></v-spacer>
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
              @click="movie.show = !movie.show"
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
      movies: [],
      currentUser: null,
      favoriteMovies: [],
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await fetch("http://localhost:4000/movies");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.movies = data;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    async fetchUserFavorites(userId) {
      const idToken = await this.currentUser.getIdToken();
      try {
        const response = await fetch(
          `http://localhost:4000/favorites/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.favoriteMovies = data;
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
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
    isFavorite(movieId) {
      return this.favoriteMovies.some((fav) => fav.id === movieId);
    },
  },
  created() {
    this.fetchMovies();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.fetchUserFavorites(user.uid);
      } else {
        this.currentUser = null;
        this.favoriteMovies = [];
      }
    });
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

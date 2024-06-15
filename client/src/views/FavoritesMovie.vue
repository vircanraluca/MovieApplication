<template>
  <div>
    <h1>Favorite Movies</h1>
    <v-row dense>
      <v-col v-for="(movie, i) in favoriteMovies" :key="i" cols="12" md="4">
        <v-card class="mx-auto" max-width="380">
          <v-img :src="movie.image" height="200px" cover></v-img>
          <v-card-title class="title">{{ movie.title }}</v-card-title>
          <v-card-subtitle class="subtitle">{{
            movie.subtitle
          }}</v-card-subtitle>
          <v-card-text>{{ movie.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoriteMovies: [],
      userId: "user123", // Exemplu de ID de utilizator; poate fi din autentificare
    };
  },
  created() {
    this.fetchFavoriteMovies();
  },
  methods: {
    async fetchFavoriteMovies() {
      try {
        const response = await fetch(
          `http://localhost:4000/favorites/${this.userId}`
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
  },
};
</script>

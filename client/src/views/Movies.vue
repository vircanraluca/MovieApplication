<template>
  <h1>VIEW OUR SELECTION OF MOVIES</h1>

  <v-row dense>
    <v-col v-for="(movie, i) in movies" :key="i" cols="12" md="4">
      <v-card class="mx-auto" max-width="380">
        <v-img :src="movie.image" height="200px" cover></v-img>
        <v-card-title class="title">{{ movie.title }}</v-card-title>
        <v-card-subtitle class="subtitle">{{ movie.subtitle }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="red" text>Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="addComment(movie)">Add a Comment</v-btn>
          <v-btn
            icon
            :color="movie.favorited ? 'red' : 'grey'"
            @click="toggleFavorite(movie)"
          >
            <v-icon>{{
              movie.favorited ? "mdi-heart" : "mdi-heart-outline"
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
</template>

<script>
export default {
  data() {
    return {
      movies: [],
    };
  },
  created() {
    this.fetchMovies();
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
    addComment(movie) {
      // Logic to add comment
    },
    toggleFavorite(movie) {
      movie.favorited = !movie.favorited;
      // Logic to update favorite status in the backend if necessary
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
</style>

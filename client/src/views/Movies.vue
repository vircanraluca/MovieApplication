<template>
  <h1>VIEW OUR SELECTION OF MOVIES</h1>

  <v-row dense>
    <v-col v-for="(movie, i) in movies" :key="i" cols="12" md="4">
      <v-card class="mx-auto" max-width="380">
        <v-img :src="movie.image" height="200px" cover></v-img>
        <v-card-title>{{ movie.title }}</v-card-title>
        <v-card-subtitle>{{ movie.subtitle }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="red" text>Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="addComment(movie)"> Add a Comment </v-btn>
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
  data: () => ({
    movies: [
      {
        title: "The Shawshank Redemption",
        subtitle: "Two imprisoned men bond over a number of years.",
        image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg",
        description: "A moving story of hope, friendship, and redemption.",
        show: false,
        favorited: false,
      },
      {
        title: "The Godfather",
        subtitle: "The aging patriarch of an organized crime dynasty.",
        image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg",
        description: "A gripping tale of family, power, and betrayal.",
        show: false,
        favorited: false,
      },
      {
        title: "The Dark Knight",
        subtitle: "When the menace known as the Joker emerges.",
        image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg",
        description: "A battle between Batman and his archenemy, the Joker.",
        show: false,
        favorited: false,
      },
      {
        title: "Pulp Fiction",
        subtitle: "The lives of two mob hitmen intertwine.",
        image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg",
        description:
          "A stylistic, interconnected narrative of crime and redemption.",
        show: false,
        favorited: false,
      },
      {
        title: "Inception",
        subtitle:
          "A thief who steals corporate secrets through the use of dream-sharing technology.",
        image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg",
        description:
          "A mind-bending thriller that dives into the world of dreams.",
        show: false,
        favorited: false,
      },
      {
        title: "Inception",
        subtitle:
          "A thief who steals corporate secrets through the use of dream-sharing technology.",
        image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg",
        description:
          "A mind-bending thriller that dives into the world of dreams.",
        show: false,
        favorited: false,
      },
    ],
  }),

  methods: {
    toggleFavorite(movie) {
      movie.favorited = !movie.favorited;
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
</style>

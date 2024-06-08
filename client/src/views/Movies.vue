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
            <v-btn color="red" text @click="openCommentsTable(movie)"
              >Comments</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn text @click="openCommentDialog(movie)">Add a Comment</v-btn>
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

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Comments for {{ selectedMovie?.title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="newComment"
                  label="Add your comment"
                  rows="4"
                  auto-grow
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-btn color="#a52a2a" text @click="addComment"> Submit </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="comments.length">
              <v-col cols="12">
                <h2>Your Comments</h2>
              </v-col>
              <v-col
                cols="12"
                v-for="(comment, index) in comments"
                :key="index"
              >
                <v-card class="mb-2">
                  <v-card-text>{{ comment.text }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeCommentDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="commentsTableDialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Comments for {{ selectedMovie?.title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">User</th>
                      <th class="text-left">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(comment, index) in comments" :key="index">
                      <td>{{ comment.user }}</td>
                      <td>{{ comment.text }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeCommentsTableDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      dialog: false,
      commentsTableDialog: false,
      selectedMovie: null,
      newComment: "",
      comments: [],
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
    openCommentDialog(movie) {
      this.selectedMovie = movie;
      this.dialog = true;
    },
    closeCommentDialog() {
      this.dialog = false;
      this.selectedMovie = null;
      this.newComment = "";
    },
    addComment() {
      if (this.newComment.trim() !== "") {
        this.comments.push({ text: this.newComment });
        this.newComment = "";
      }
    },
    openCommentsTable(movie) {
      this.selectedMovie = movie;
      // Fetch comments for the selected movie
      this.fetchComments(movie);
      this.commentsTableDialog = true;
    },
    closeCommentsTableDialog() {
      this.commentsTableDialog = false;
      this.selectedMovie = null;
    },
    fetchComments(movie) {
      // Replace this with actual fetch logic
      // For example: fetch(`http://localhost:4000/movies/${movie.id}/comments`)
      this.comments = [
        { user: "User1", text: "Great movie!" },
        { user: "User2", text: "Loved the plot and characters." },
      ];
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

.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>

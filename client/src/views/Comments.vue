<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Comments for {{ movie.title }}</h1>
          <v-textarea
            v-model="newComment"
            label="Add your comment"
            rows="4"
            auto-grow
          ></v-textarea>
          <v-btn color="#a52a2a">Submit</v-btn>
        </v-col>
        <v-col cols="12" v-if="comments.length">
          <h2>Your Comments</h2>
          <v-card
            v-for="(comment, index) in comments"
            :key="index"
            class="mb-2"
          >
            <v-card-text>{{ comment.text }}</v-card-text>
          </v-card>
        </v-col>
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
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      movie: {},
      newComment: "",
      comments: [],
    };
  },
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

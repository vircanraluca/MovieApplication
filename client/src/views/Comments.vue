<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Add a Comment</h1>
          <v-textarea
            v-model="newComment"
            label="Add your comment"
            rows="4"
            auto-grow
          ></v-textarea>
          <v-btn color="#a52a2a" @click="addComment">Submit</v-btn>
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
        <!-- Tabelul adăugat mai jos -->
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Email</th>
                <th class="text-left">Comment</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(comment, index) in comments" :key="index">
                <td>{{ comment.email }}</td>
                <td>{{ comment.comment }}</td>
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
      newComment: "",
      comments: [],
    };
  },
  methods: {
    async addComment() {
      if (this.newComment.trim() !== "") {
        try {
          const comment = {
            user: "Anonymous",
            text: this.newComment,
          };
          console.log("Movie ID:", this.id); // Debugging line to check movie ID
          const response = await fetch(
            `http://localhost:4000/comments/${this.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(comment),
            }
          );

          if (response.ok) {
            this.comments.push(comment);
            this.newComment = "";
          } else {
            const errorText = await response.text();
            console.error("Error adding comment:", errorText);
          }
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    },
    async fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:4000/comments/${this.id}`
        );
        if (response.ok) {
          this.comments = await response.json();
        } else {
          const errorText = await response.text();
          console.error("Error fetching comments:", errorText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
  },
  created() {
    this.fetchComments();
  },
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

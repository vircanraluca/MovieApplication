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
        <!-- Tabelul adăugat mai jos -->
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Email</th>
                <th class="text-left">Comment</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(comment, index) in comments" :key="index">
                <td>{{ comment.user }}</td>
                <td>{{ comment.text }}</td>
                <td>
                  <v-btn
                    v-if="currentUser && comment.user === currentUser.email"
                    color="red"
                    class="ml-2"
                    @click="deleteComment(comment.id)"
                  >
                    Delete
                  </v-btn>

                  <v-btn
                    v-if="currentUser && comment.user === currentUser.email"
                    color="blue"
                    class="ml-2"
                  >
                    Edit
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  props: ["id"],
  data() {
    return {
      newComment: "",
      comments: [],
      currentUser: null,
    };
  },
  methods: {
    async addComment() {
      if (this.newComment.trim() !== "") {
        try {
          const currentUser = this.currentUser;
          if (!currentUser) {
            throw new Error("User not authenticated");
          }

          const idToken = await currentUser.getIdToken();
          const comment = {
            user: currentUser.email,
            text: this.newComment,
            movieId: this.id, // Adaugă și movieId dacă este necesar
          };
          const response = await fetch(
            `http://localhost:4000/comments/${this.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify(comment),
            }
          );

          if (response.ok) {
            const newComment = await response.json(); // Presupunând că backend-ul returnează comentariul nou cu ID-ul său
            this.comments.push({ id: newComment.id, ...newComment });
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
          const commentsData = await response.json();
          // Map the comments to include the Firebase ID
          this.comments = Object.keys(commentsData).map((key) => {
            return { id: key, ...commentsData[key] };
          });
        } else {
          const errorText = await response.text();
          console.error("Error fetching comments:", errorText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async deleteComment(commentId) {
      if (!commentId) {
        console.error("Invalid comment ID");
        return;
      }
      console.log("Attempting to delete comment with ID:", commentId); // Log pentru debug
      try {
        const response = await fetch(
          `http://localhost:4000/comments/${commentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          this.comments = this.comments.filter(
            (comment) => comment.id !== commentId
          );
          console.log("Comment deleted successfully.");
        } else {
          console.error("Error deleting comment:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    },
  },
  created() {
    this.fetchComments();

    // Ascultă schimbările de autentificare pentru a obține utilizatorul curent
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  },
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

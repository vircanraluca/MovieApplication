<template>
  <div class="comments_container">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1><span id="bigletter">A</span>dd a Comment</h1>
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
          <v-table class="table">
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
                    color="#a52a2a"
                    class="ml-2"
                    @click="deleteComment(comment.id)"
                  >
                    Delete
                  </v-btn>

                  <v-btn
                    v-if="currentUser && comment.user === currentUser.email"
                    color="#003566"
                    class="ml-2"
                    @click="openEditDialog(comment)"
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

    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline">Edit Comment</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="editedComment"
            label="Edit your comment"
            rows="4"
            auto-grow
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="updateComment">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      editDialog: false,
      editedComment: "",
      currentCommentId: null,
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
            movieId: this.id,
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
            const newComment = await response.json();
            console.log("New comment data:", newComment); // Log new comment data
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
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Raw comments data:", data); // Log raw data

        this.comments = data.map((comment) => {
          console.log("Processing comment:", comment); // Log each comment
          console.log("Comment ID:", comment.id); // Log each comment ID
          return { id: comment.id, ...comment };
        });

        console.log("Processed comments:", this.comments); // Log processed comments
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
        const currentUser = this.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }

        const idToken = await currentUser.getIdToken();
        const response = await fetch(
          `http://localhost:4000/comments/${commentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
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
    openEditDialog(comment) {
      this.editedComment = comment.text;
      this.currentCommentId = comment.id;
      this.editDialog = true;
    },
    async updateComment() {
      if (!this.currentCommentId) {
        console.error("Invalid comment ID");
        return;
      }
      try {
        const currentUser = this.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }

        const idToken = await currentUser.getIdToken();
        const response = await fetch(
          `http://localhost:4000/comments/${this.currentCommentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ text: this.editedComment }),
          }
        );

        if (response.ok) {
          const updatedComment = await response.json();
          const index = this.comments.findIndex(
            (comment) => comment.id === this.currentCommentId
          );
          if (index !== -1) {
            this.comments.splice(index, 1, {
              ...updatedComment,
              id: this.currentCommentId,
            });
          }
          this.editDialog = false;
          this.editedComment = "";
          this.currentCommentId = null;
        } else {
          console.error("Error updating comment:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    },
  },
  created() {
    this.fetchComments();

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
  text-align: center;
  margin-top: 50px;
  font-size: 50px;
}

.comments_container {
  background-color: black;
  color: white;
}
#bigletter {
  font-size: 4rem;
  color: red;
}
body {
  background-color: black;
  color: white;
  margin: 0; /* Elimină marginile implicite ale body-ului */
  padding: 0;
}

.table {
  background-color: #242423;
  color: white;
}

.v-btn {
  margin-top: 10px;
}
.v-table {
  width: 100%;
  overflow-x: auto; /* Permite tabelului să fie scrollabil orizontal dacă depășește lățimea viewport-ului */
}

@media (max-width: 414px) {
  /* Telefoane */
  .table th,
  .table td {
    padding: 4px 10px;
    font-size: 12px; /* Text mai mic pentru economisirea spațiului */
  }
  .v-btn {
    min-width: 60px; /* Butoane mai mici */
    padding: 6px 8px;
    font-size: 12px;
  }
}

@media (min-width: 415px) and (max-width: 1024px) {
  /* Tablete */
  .table th,
  .table td {
    padding: 6px 12px;
    font-size: 14px;
  }
  .v-btn {
    min-width: 80px;
    padding: 8px 10px;
    font-size: 14px;
  }
}

@media (min-width: 1025px) {
  /* Laptopuri */
  .table th,
  .table td {
    padding: 8px 16px;
    font-size: 16px;
  }
  .v-btn {
    min-width: 100px;
    padding: 10px 15px;
    font-size: 16px;
  }
}

.table th,
.table td {
  padding: 8px 16px;
}

.table th:nth-child(1),
.table td:nth-child(1) {
  width: 20%;
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 60%;
}

.table th:nth-child(3),
.table td:nth-child(3) {
  width: 20%;
}

@media (max-width: 414px) {
  .table th,
  .table td {
    padding: 4px 8px;
  }
}

.action-btn {
  margin-bottom: 8px; /* Adaugă o margine jos pentru a crea spațiu între butoane */
}
</style>

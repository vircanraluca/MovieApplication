<template>
  <v-app>
    <v-container class="dashboard-container">
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="mb-5">WELCOME TO MOVIEREV</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8" style="margin-top: 80px">
          <h1>MovieRev</h1>
          <p class="subheading font-weight">
            Dive into the fascinating world of cinema with us. Explore and
            review thousands of movies across all genres, from timeless classics
            to the latest blockbusters. Share your thoughts and rate movies to
            help others discover their next favorite film. Join our passionate
            community of movie enthusiasts and contribute to a growing
            collection of reviews and recommendations.
          </p>

          <v-btn color="#a52a2a" class="v-btn--large mt-2"
            >Explore Movies</v-btn
          >
        </v-col>

        <v-col cols="4">
          <v-img
            src="../assets/movie_dashboard.png"
            alt="GastroDelights Image"
            class="mx-auto"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style>
h1 {
  margin-top: 50px;
  font-size: 2.5rem;
}

.dashboard-container {
  margin: 30;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

<script setup></script>

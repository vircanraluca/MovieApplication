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
            alt="MovieRev Image"
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

    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="text-center mb-5" style="color: #a52a2a; font-size: 2.5rem">
          About Us
        </h2>
        <v-stepper :items="['Discover', 'Review', 'Connect']" color="primary">
          <template v-slot:item.1>
            <v-card title="Discover" flat>
              <v-card-text>
                At MovieRev, we believe that the joy of cinema lies in
                exploration. Our platform offers a vast collection of movies
                spanning various genres and eras. Use our advanced search and
                filtering options to discover hidden gems, blockbuster hits, and
                timeless classics that match your unique interests. Whether
                you're in the mood for an indie drama, a sci-fi adventure, or a
                heartwarming romance, MovieRev is here to help you find the
                perfect film for any occasion.
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.2>
            <v-card title="Review" flat>
              <v-card-text>
                Your voice matters at MovieRev. Share your thoughts and insights
                on the movies you've watched. Write detailed reviews and provide
                ratings to guide fellow movie enthusiasts. Whether you loved a
                film or thought it fell short, your opinions help others make
                informed viewing choices. Our community thrives on honest and
                diverse perspectives, making MovieRev a trusted source for movie
                recommendations and critiques.
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.3>
            <v-card title="Connect" flat>
              <v-card-text>
                MovieRev is more than just a review site; it's a community of
                passionate movie lovers. Connect with other users, follow their
                reviews, and engage in lively discussions about your favorite
                films. Share your cinematic experiences, exchange
                recommendations, and build a network of friends who share your
                love for movies. At MovieRev, we bring people together through
                the magic of cinema, fostering connections that go beyond the
                screen.
              </v-card-text>
            </v-card>
          </template>
        </v-stepper>
      </v-col>
    </v-row>
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

.v-stepper {
  max-width: 20000px;
}
</style>

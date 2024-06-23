<template>
  <v-app>
    <div class="section1">
      <div class="apply">

        <h2> All the latest movies, series and shows</h2>

        <h3>
          Join our passionate
          community of movie enthusiasts and contribute to a growing collection
          of reviews and recommendations.
        </h3>
        <div class="button-container">
          <v-btn color="#a52a2a" class="v-btn--large center-button mt-2">
            Explore Movies
          </v-btn>
        </div>
      </div>
    </div>

    <div class="section2">
      <div>
        <h1>View The Most Popular Movies</h1>
      </div>
      <div class="imgs">
        <img
          src="https://m.media-amazon.com/images/M/MV5BNTEzMzBiNGYtYThiZS00MzBjLTk5ZWItM2FmMzU3Y2RjYTVlXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UX1000_.jpg" />
        <img
          src="https://pyxis.nymag.com/v1/imgs/e7c/1ce/29ba7ab00372a87239627261f7ba8acc70-17-true-detective.2x.h473.w710.jpg" />
        <img
          src="https://ew.com/thmb/Jua28XPVRQyx3FOJh1BH46TOBuc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/true-detective-s1_1-2000-b73d8c089ab64387b2ae805dd4168dde.jpg" />

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeJOO-9FXPGvMalP96svQOvvjwBjplyIs0g&usqp=CAU" />
      </div>
    </div>

    <div class="section4">
      <div class="movies">
        <h1><span id="bigletter">T</span>he most popular movies</h1>
        <p>Stream the succesess,
        <p> including the latest from DC and Warner Bros</p> + the comedies, dramas and the classics you love</p>
      </div>

      <div class="movieexamples">
        <img
          src="https://assets-prd.ignimgs.com/2022/10/14/darkknightcanned-1665789495277.jpg?width=300&crop=1%3A1%2Csmart&auto=webp">
        <img src="https://daviddas.com/wp-content/uploads/2019/06/Game-of-Thrones-300x300.jpg">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqvQgtMCguH6CR6sBy_nVfKoLBGvpFEuMBIyC78npfWw&s">
        <img src="https://i1.sndcdn.com/artworks-0qJytq5kreMppHy7-N4Ex1g-t500x500.jpg">
        <img src="https://i1.sndcdn.com/artworks-gE2k66khMJ7h-0-t500x500.jpg">
        <img src="https://i1.sndcdn.com/artworks-jrzglYWBvs5zAizM-LQszyQ-t500x500.jpg">
      </div>

    </div>
  </v-app>
</template>

<style>
.section1 {
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/db81a53f-1e95-40aa-8cb9-4e7f8e58e408/SE-sv-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.section1 {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.section1 h2 {
  color: white;
  text-wrap: wrap;
  text-align: center;
  font-size: 4rem;
}

.section1 h3 {
  color: white;
  text-wrap: wrap;
  text-align: center;
  font-size: 1.3rem;
}

::placeholder {
  color: white;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-btn--large {
  width: 300px;
  height: 100px;
  padding: 10px;
  text-align: center;
  outline: none;
  background: red; 
  color: white;
  margin: 1rem auto; 
}

.v-btn--large:hover {
  background: #a020f0;
  transition-duration: 0.8s;
  cursor: pointer;
}

.section2 {
  width: 100vw;
  background: black;
  margin-top: -0.5rem;
  padding: 30px;
  color: white;
  font-size: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}

.section2 h1 {
  padding: 90px 0;
  font-family: "Courier New", Courier, monospace;
}

.section2 img {
  width: 300px;
  height: 150px;
  object-fit: cover;
}

.imgs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin-top: 1rem;
}



.section4 {
  background: black;
  width: 100vw;
  color: white;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}

.movieexamples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}

.movies {
  text-align: center;
  padding: 90px 0;
}


.section4 h1 {
  color: white;
}

#bigletter {
  font-size: 4rem;
  color: red;
}

.movieexamples img {
  width: 300px;
  height: 250px;
  object-fit: contain;
}

.subscribe {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100vw;
  gap: 2rem;
  padding: 20px;
  background: url("https://hbomax-images.warnermediacdn.com/module-assets/gradient2.jpg?host=wme-hbomax-drupal-prod.s3.amazonaws.com") no-repeat fixed;
  background-size: cover;
}


.button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  background: #A020F0;
  color: white;
  border-radius: 30px;
  transition-duration: 0.8s;
  width: 80%;
  height: 20%;
  cursor: pointer;
}

.button:hover {
  background: white;
  color: black;
}

@media screen and (max-width: 1100px) {

  .section1 {
    height: 100vh;
  }

  .section2 {
    grid-template-columns: 1fr;
  }

  .imgs {
    grid-template-columns: 1fr 1fr;
  }

  .section4 {
    grid-template-columns: 1fr;
  }

  .movieexamples {
    grid-template-columns: 1fr 1fr;
  }

  .movieexamples img {
    width: 95%;
  }


}



@media screen and (max-width: 700px) {

  .imgs {
    grid-template-columns: 1fr 1fr;
  }

  .imgs img {
    max-width: 100%;
  }

  .section2 h1 {
    text-align: center;
  }

}


.section1 {
  height: 100vh;
}

.section1 h1,
h2,
h3 {
  font-size: 0.9rem;
}


.section2 h1 {
  text-wrap: wrap;
  font-size: 1.5rem;
}


.section3 h1 {
  text-wrap: wrap;
  font-size: 1rem;
}

.section3 img {
  object-fit: contain;
}

.section4 h1 {
  text-wrap: wrap;
  font-size: 1.5rem;
}

.imgs img {
  max-width: 100%;
}


.movieexamples img {
  width: 100%;
  height: 300px;
  object-fit: contain;
}

.row {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}
</style>

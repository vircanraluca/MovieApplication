<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <!-- <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item> -->
          <v-list-item title="MOVIEW"></v-list-item>
        </v-list>

        <v-list density="compact" nav>
          <v-list-item
            to="/"
            prepend-icon="mdi-home"
            title="Home"
            value="home"
          ></v-list-item>
          <v-list-item
            to="/login"
            prepend-icon="mdi-login"
            title="Login"
            value="login"
          ></v-list-item>
          <v-list-item
            to="/watchlist"
            prepend-icon="mdi-format-list-bulleted"
            title="Watchlist"
            value="watchlist"
          ></v-list-item>
          <v-list-item
            to="/favorites"
            prepend-icon="mdi-heart"
            title="Favorites"
            value="favorites"
          ></v-list-item>
          <v-list-item
            to="/about"
            prepend-icon="mdi-information"
            title="About"
            value="about"
          >
          </v-list-item>
          <v-list-item
            to="/register"
            prepend-icon="mdi-account-plus"
            title="Register"
            value="register"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script></script>

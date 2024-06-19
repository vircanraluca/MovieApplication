/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNdDLKcYQTURmSj_1AdysofVWwNDXk4mY",
  authDomain: "movieapp-a7969.firebaseapp.com",
  projectId: "movieapp-a7969",
  storageBucket: "movieapp-a7969.appspot.com",
  messagingSenderId: "797940095430",
  appId: "1:797940095430:web:fc507e12735320cce0bac7",
  measurementId: "G-X536MRLPZJ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

app.config.globalProperties.$auth = auth;

app.mount("#app");

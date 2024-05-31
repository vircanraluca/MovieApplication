const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./db/movieapp-a7969-firebase-adminsdk-9svx8-28f6a5d42f.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

//server app => express
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const port = 4000;

const fs = require("fs");

app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

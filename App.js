import express from 'express';
import bodyParser from 'body-parser';
import passport from "passport";
import cors from "cors";
import marked from "marked";
import fs from "fs";
import api from "./routes"

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get("/", (request, response) => {
  const file = fs.readFileSync("./README.md", 'utf8');
  response.send(marked(file.toString()));
});

app.use("/api", api);

module.exports = app;
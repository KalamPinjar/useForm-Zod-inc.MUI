import express from "express";
import cors from "cors";
import { genders, languages, skills, states, users } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/states", (req, res) => {
  res.json(states);
});
app.get("/languages", (req, res) => {
  res.json(languages);
});
app.get("/genders", (req, res) => {
  res.json(genders);
});
app.get("/skills", (req, res) => {
  res.json(skills);
});
app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Convert id to number
  const user = users.find((user) => user.id === id); // Compare as a number
  res.json(user);
});

app.post("/users", (req, res) => {
  const data = req.body;
  const id = users.length + 1;
  data.id = id;
  users.push(data);
  res.json(users);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Convert id to number
  const data = req.body;
  const index = users.findIndex((user) => user.id === id); // Compare as a number
  users[index] = data;
  res.json(users);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

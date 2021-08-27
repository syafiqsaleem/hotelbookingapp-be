import express from "express";
// import router from "./routes/auth" --> No longer needed due to autoloading routes
import { readdirSync } from "fs"; // comes with node.js as default (autoloading routes)
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// middlewares
app.use(morgan("dev")); // In development mode(dev) --> helps tell us what kind of request was made(GET/POST/etc)
// route middleware
// Autoloading routes:
// readdirSync --> To ensure we are reading all the routes
// readdirSync takes a function of the directory that we want it to read
// map --> to map all the files that are in the routes folder
// map takes a function as an argument
// r --> shortform for routes
// When we map through the files we apply each of them as a middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

import express from "express";
// import router from "./routes/auth" --> No longer needed due to autoloading routes
import { readdirSync } from "fs"; // comes with node.js as default (autoloading routes)
const morgan = require("morgan");
import cors from "cors"; // FE: Port 3000, BE: Port 8000, different origin which might cause a cors error
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev")); // In development mode(dev) --> helps tell us what kind of request was made(GET/POST/etc)
app.use(express.json()); // Resolve the problem of undefined when data sent from FE to BE (Can also use body-parser)

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

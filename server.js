import express from "express";

const app = express();

app.get("/api/:message", (req, res) => {
  res.status(200).send(`Here is your message: ${req.params.message}`);
});

app.listen(8000, () => console.log(`Server is running on port 8000`));

import express from "express";
import routes from "./routes/guests";
const app = express();
const port = process.env.PORT || 3000;


app.use('/', routes)
app.use((req, res, next) => {
  const error = new Error('Not found');
  return res.status(404).json({
      message: error.message
  });
});

app.use(express.json())

app.listen(port, () => {
  console.log(`Hotel booking backend listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("App is up and running");
});

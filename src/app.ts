import express, { NextFunction, Request, Response } from "express";
import routes from "./routes/guests";
const app = express();
const port = process.env.PORT || 3000;


// var bodyParser = require('body-parser')
import bodyParser from 'body-parser';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//error middleware
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use('/', routes)
app.use((req, res, next) => {
  const error = new Error('Requested URL was not found');
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

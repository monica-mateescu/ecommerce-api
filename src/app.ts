import express from "express";
import "#db";
import {errorHandler} from "#middlerware";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// To allow a front-end application to access APIs from a different origin during development
app.use(cors());

app.get("/", (req, res) => res.send("eCommerce API is running!"));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Main app listening at http://localhost:${port}`)
);

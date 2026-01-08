import express from "express";
import "#db";
import {errorHandler} from "#middlerware";

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.get("/", (req, res) => res.send("eCommerce API is running!"));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Main app listening at http://localhost:${port}`)
);

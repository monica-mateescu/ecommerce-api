import express from "express";
import "#db";
import { errorHandler } from "#middleware";
import cors from "cors";
import { categoryRouter, userRouter } from "#routers";

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// To allow a front-end application to access APIs from a different origin during development
app.use(cors());

app.get("/", (req, res) => res.send("eCommerce API is running!"));

app.use("/users", userRouter);
app.use("/categories", categoryRouter);

app.use("*splat", (req, res) => {
  throw new Error("Not found", { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Main app listening at http://localhost:${port}`)
);

import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "#controllers";
import { validateBodyZod, validateObjectIdParam } from "#middleware";
import { userInputSchema } from "#schemas";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", validateBodyZod(userInputSchema), createUser);
userRouter.get("/:id", validateObjectIdParam('id'), getUserById);
userRouter.put("/:id", validateObjectIdParam('id'), validateBodyZod(userInputSchema), updateUser);
userRouter.delete("/:id", validateObjectIdParam('id'), deleteUser);

export default userRouter;

import { Router } from "express";
import { CreateUser } from "../Controllers/User/CreateUser.mjs";
import { DeleteUser } from "../Controllers/User/DeleteUser.mjs";
import { EditUser } from "../Controllers/User/EditUser.mjs";

const route = Router();

route.post("/users", CreateUser);
route.delete("/users/:id", DeleteUser);
route.put("/users/:id", EditUser);

export default route;

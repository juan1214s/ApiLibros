import { Router } from "express";
import { loginApi } from "../Controllers/Login/login.mjs";

const route = Router();

route.post("/login", loginApi);


export default route;
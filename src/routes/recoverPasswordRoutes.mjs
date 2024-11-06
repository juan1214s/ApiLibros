import { Router } from "express";
import { RecoverPassword } from "../Controllers/recoverPassword/recoverPassword.mjs";

const route = Router();

route.post("/recoverPassword", RecoverPassword);

export default route;
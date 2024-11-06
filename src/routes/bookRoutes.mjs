import { Router } from "express";
import { CreateBook } from "../Controllers/Books/CreateBook.mjs";
import { DeleteBook } from "../Controllers/Books/DeleteBook.mjs";
import { EditBook } from "../Controllers/Books/EditBook.mjs";
import { GetBook } from "../Controllers/Books/GetBook.mjs";
import { authMiddleware } from "../Jwt/AuthMiddleware.mjs";

const route = Router();

route.post("/book", authMiddleware , CreateBook);
route.delete("/book/:id", authMiddleware , DeleteBook);
route.put("/book/:id", authMiddleware , EditBook);
route.get("/book/:id", GetBook);

export default route;

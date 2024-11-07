import { Router } from "express";
import { CreateBook } from "../Controllers/Books/CreateBook.mjs";
import { DeleteBook } from "../Controllers/Books/DeleteBook.mjs";
import { EditBook } from "../Controllers/Books/EditBook.mjs";
import { GetBookById } from "../Controllers/Books/GetBookById.mjs";
import { authMiddleware } from "../Jwt/AuthMiddleware.mjs";
import { GetBooks } from "../Controllers/Books/GetBooks.mjs";

const route = Router();

route.post("/book", authMiddleware , CreateBook);
route.delete("/book/:id", authMiddleware , DeleteBook);
route.put("/book/:id", authMiddleware , EditBook);
route.get("/book/:id", GetBookById);
route.get("/books", GetBooks);

export default route;

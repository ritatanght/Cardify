const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const setsRouter = require("./routes/sets");
const cardsRouter = require("./routes/cards");
const favoritesRouter = require("./routes/favorites");
const searchesRouter = require("./routes/searches");
const authRouter = require("./routes/auth")

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/sets", setsRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/search", searchesRouter);

module.exports = app;

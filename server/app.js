var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const setsRouter = require("./routes/sets");
const cardsRouter = require('./routes/cards')
const favoritesRouter = require("./routes/favorites");
const searchesRouter = require("./routes/searches")

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/sets', setsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/categories', categoriesRouter);
app.use("/api/favorites", favoritesRouter);
app.use('/api/search', searchesRouter);

module.exports = app;

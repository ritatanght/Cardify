var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const setsRouter = require("./routes/sets");
const cardsRouter = require('./routes/cards')
const favoritesRouter = require("./routes/favorites");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/sets', setsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/categories', categoriesRouter);
app.use("/api/favorites", favoritesRouter);

module.exports = app;

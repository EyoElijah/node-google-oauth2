const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const authRoute = require("./routes/index.route");
const googleAuthRoute = require("./routes/auth.route");
const storiesRoute = require("./routes/stories.route");
const app = express();

//helpers

const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

app.engine(
  ".hbs",
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

require("./config/passport")(passport);

//  session middleware
app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

//middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global variable

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//static assets
app.use(express.static(path.join(__dirname, "public")));

//route
app.use("/", authRoute);
app.use("/auth", googleAuthRoute);
app.use("/stories", storiesRoute);

module.exports = app;

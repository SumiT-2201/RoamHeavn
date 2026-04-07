require("events").EventEmitter.defaultMaxListeners = 20;

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const axios = require("axios");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

const bookingRoutes = require("./routes/bookings");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// app.get("/", (req, res) => {
//   res.send("Hi , I am root");
// });

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session(sessionOptions)); // session setup
app.use(flash()); // flash setup

app.use(passport.initialize()); // passport init
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/bookings", bookingRoutes);



const Listing = require("./models/listing.js");
app.get("/search", async (req, res) => {
  const query = req.query.q?.trim();

  if (!query) {
    req.flash("error", "Please enter a search term.");
    return res.redirect("/listings");
  }

  // Search in title, location, or country (case-insensitive)
  const allListings = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } },
    ],
  });

  res.render("listings/index.ejs", { allListings });
});



// 

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message });
  //   res.status(statusCode).send(message);
});

const { GoogleGenerativeAI } = require("@google/generative-ai");

app.post("/api/jarvis", async (req, res) => {
  const { message } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("❌ Gemini Error:", err.message);
    res
      .status(500)
      .json({ reply: "Jarvis is having trouble responding right now." });
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server is listening on port " + (process.env.PORT || 8080));
});

module.exports = app;

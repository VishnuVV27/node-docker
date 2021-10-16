const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
let Redisstore = require("connect-redis")(session);
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  REDIS_URL,
  MONGO_PORT,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const app = express();
app.use(express.json());
const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const postRoute = require("./routes/postRoutes");
const userRoute = require("./routes/userRoutes");
const connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected"))
    .catch((e) => {
      console.log(e);
      setTimeout(connect, 5000);
    });
};

connect();
app.enable("trust proxy");
app.use(
  session({
    store: new Redisstore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 300000,
    },
  })
);
const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.send("Vishnu!!!");
  console.log("Check");
});

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

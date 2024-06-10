const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const port = process.env.port || 3000;
const db = require("./models");
const Role = db.role;
const cors = require("cors");

var corsOptions = {
  origin: "https://groomingbuddy.netlify.app", 
  optionSuccessStatus:200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  cookieSession({
    name: "GroomingBuddy",
    keys: ["SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);
// Database innit
db.mongoose
  .connect(
    "mongodb+srv://test:test@clustertest.hehtbr4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    init();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// app.use('/auth', authRoutes);
// app.use('/protected', protectedRoute);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

function init() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.listen(port, () => {
  console.log(`Servis radi na portu ${port}`);
});

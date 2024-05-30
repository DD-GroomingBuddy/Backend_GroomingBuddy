import express from 'express';

const cookieSession = require("cookie-session");

const app = express();
const port = process.env.port || 3000;
const db = require("./models");
const cors = require("cors");
const Role = db.role;


var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  cookieSession({
    name: "GroomingBuddy",
    keys: ["SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);
// Database innit
db.mongoose
  .connect("mongodb+srv://test:test@clustertest.hehtbr4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    init();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
app.listen(port, () => {
  console.log(`Servis radi na portu ${port}`);
});

// app.use('/auth', authRoutes);
// app.use('/protected', protectedRoute);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


//dodat fuknciju za user catch error i admin
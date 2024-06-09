const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");
const cors = require('cors');

module.exports = function (app) {
  // Global CORS settings if applicable
  app.use(cors());

  app.post(
    "/api/auth/signup",
    cors(), // Apply CORS per-route basis if specific origins needed
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", cors(), controller.signin);
  app.post("/api/auth/signout", cors(), controller.signout);
  app.post("/api/auth/appointment/add", [authJwt.verifyToken], controller.appointmentAdd);
  app.get("/api/auth/appointment/get", [authJwt.verifyToken], controller.getAppointments);
  app.get("/api/auth/appointment/getAll", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllAppointments);
  app.delete("/api/auth/appointment/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.appointmentDelete);
};

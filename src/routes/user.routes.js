const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/appointment/add", [authJwt.verifyToken],controller.appointmentAdd);

  app.get("/api/appointment/get", [authJwt.verifyToken], controller.getAppointments);

  app.get("/api/appointment/getAll", [authJwt.verifyToken , authJwt.isAdmin], controller.getAllAppointments)

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.post("/api/contact", authJwt.allAccess ,controller.sendEmail);

  app.delete("/api/appointment/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.appointmentDelete);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
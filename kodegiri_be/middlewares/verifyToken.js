const { validateToken } = require("../helpers/jwt");

module.exports = {
  verifyToken: (req, res, next) => {
    if (!req.token)
      return res.status(401).send({
        message: "No Token",
      });

    try {
      const verifiedUser = validateToken(req.token);

      if (!verifiedUser)
        return res.status(401).send({ message: "Unauthorized Request" });

      next();
    } catch (err) {
      console.log(err);
      res.status(401).send({
        message: "Error when proccesing token",
      });
    }
  },
};

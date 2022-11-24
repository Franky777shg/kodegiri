const { asyncQuery } = require("../helpers/queryHelp");
const { createToken } = require("../helpers/jwt");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.token);

      const loginQuery =
        "SELECT * FROM users WHERE username = ? AND password = ?";

      const user = await asyncQuery(loginQuery, [username, password]);
      if (user.length === 0) throw "Username or Password is wrong!";

      const token = createToken({
        id: user[0].id,
      });

      res.status(200).send({
        user: user[0],
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};

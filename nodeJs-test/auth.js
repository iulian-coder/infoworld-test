const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;

const login = (req, res) => {
  const payload = {
    authenticated: true,
    iss: "JWT Builder",
    facility: ["12", "13", "1", "2"],
    roles: ["Admin"],
  };

  const accessToken = jwt.sign(payload, jwtSecretKey);
  res.setHeader("x-vamf-jwt", accessToken);
  res.send("Successfully login token: " + accessToken);
};

const currentUser = (req, res) => {
  const user = req.claims;
  res.send(user);
};

const authenticateToken = (req, res, next) => {
  const token = req.headers["x-vamf-jwt"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, claims) => {
    if (err) return res.sendStatus(403);
    req.claims = claims;
    next();
  });
};

const authorizeAccess = (role) => {
  return (req, res, next) => {
    const { roles } = req.claims;
    let common = roles.filter((x) => role.includes(x));
    if (common.length === 0) {
      res.status(401);
      return res.send("Not allowed !");
    }
    next();
  };
};

module.exports = {
  login,
  currentUser,
  authenticateToken,
  authorizeAccess,
};

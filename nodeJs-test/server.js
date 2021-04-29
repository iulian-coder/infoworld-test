require("dotenv").config();
const express = require("express");
const { ROLE } = require("./userRoles");
const {
  login,
  authenticateToken,
  currentUser,
  authorizeAccess,
} = require("./auth");
const { upload } = require("./readFile");
const { exerciseAndB } = require("./exerciseAndB");

const app = express();
const port = process.env.PORT || 9999;
app.use(express.json());

// Exercise A & B
app.post(
  "/api/v1/doctors/upload",
  authenticateToken,
  authorizeAccess([ROLE.ADMIN, ROLE.PRACTITIONER]),
  upload.single("file"),
  exerciseAndB
);

// Exercise C
app.post("/auth/login", login);

app.get("/user/me", authenticateToken, currentUser);

app.listen(port, () => console.log(`Listen on ${port}....`));

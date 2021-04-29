const { exerciseA } = require("./exerciseA");
const { exerciseB } = require("./exerciseB");

const exerciseAndB = (req, res) => {
  if (req.file !== undefined) {
    exerciseB(req, res);
  } else {
    exerciseA(req, res);
  }
};

module.exports = { exerciseAndB };

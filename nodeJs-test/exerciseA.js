const { filterData } = require("./util");
const Joi = require("joi");
const currentRunProcessedId = new Set();

const exerciseA = (req, res) => {
  const { facility } = req.claims;
  // Exercise A.2 - If property "id" is missing or "resourceType" not ""Practitioner" return error
  const schema = Joi.object()
    .keys({
      resourceType: Joi.string().pattern(new RegExp("Practitioner")).required(),
      id: Joi.string().required(),
    })
    .options({ allowUnknown: true });

  const dataJson = req.body;
  const { error } = schema.validate(dataJson);

  if (error) return res.status(400).send(error.details[0].message);

  // Exercise A.3 - Show an error message if property "id" has been recorded in the same run
  if (currentRunProcessedId.has(dataJson.id))
    return res.status(400).send(`Error id ${dataJson.id} already processed`);

  // Exercise A.1 - Print on console information "name" & "facility" if status "active"
  if (dataJson.active) {
    // Exercise C.2
    const dataAuthUserHaveAccess = filterData({
      data: dataJson.facility,
      filterPropertyName: "value",
      filterValues: facility,
    });
    console.log(dataJson.name);
    console.log(dataAuthUserHaveAccess);
  }

  currentRunProcessedId.add(dataJson.id);

  res.send("Data were processed");
};

module.exports = {
  exerciseA,
};

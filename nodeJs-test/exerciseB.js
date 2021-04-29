const { filterData } = require("./util");
const { readDataFromFile } = require("./readFile");

const exerciseB = (req, res) => {
  const { facility } = req.claims;

  processingUploadedFile({
    filepath: req.file.path,
    filterValues: facility,
  }).then((response) => {
    res.send(response);
  });
};

async function processingUploadedFile({ filepath, filterValues }) {
  try {
    const data = await readDataFromFile(filepath);

    // Exercise C.2
    const dataAuthUserHaveAccess = filterData({
      data: data,
      filterPropertyName: "FacilityId",
      filterValues: filterValues,
    });

    // Exercise B.1
    showDoctorsActiveInHospitals({ data: dataAuthUserHaveAccess });

    //Exercise B.2
    const resultIdAndNameConsistency = idAndNameConsistency({
      data: dataAuthUserHaveAccess,
    });

    resultIdAndNameConsistency.forEach((item) => {
      if (item.isNameTheSame === false) {
        console.error(
          "!ERROR The facility id " + item.FacilityId + " has different names"
        );
      }
    });
    return "File processed";
  } catch (error) {
    console.error("An error occurred: ", error.message);
  }
}

function showDoctorsActiveInHospitals({ data }) {
  const doctors = Array.from(new Set(data.map((s) => s.ID))).map((ID) => {
    return {
      ID: ID,
      FamilyName: data.find((s) => s.ID === ID).FamilyName,
      GivenName: data.find((s) => s.ID === ID).GivenName,
    };
  });

  const hospitals = data.map((item) => {
    return {
      FacilityId: item.FacilityId,
      SystemId: item.SystemId,
      NameId: item.NameId,
      DoctorId: item.ID,
      DoctorStatus: item.Active,
    };
  });

  doctors.forEach((doctor) => {
    console.log("Doctor " + doctor.FamilyName + " " + doctor.GivenName);
    console.log("Active in: ");
    hospitals.forEach((hospital) => {
      if (hospital.DoctorId === doctor.ID && hospital.DoctorStatus === "TRUE") {
        console.log(hospital.NameId);
      }
    });
  });
}

function idAndNameConsistency({ data }) {
  const uniqFacilityId = Array.from(
    new Set(data.map((item) => item.FacilityId))
  );

  const hospitalsRecords = [];
  uniqFacilityId.map((id) => {
    let resultFilter = data.filter((item) => item.FacilityId === id);
    hospitalsRecords.push(resultFilter);
  });

  return hospitalsRecords.map((item) => {
    return {
      FacilityId: item[0].FacilityId,
      isNameTheSame: isNameTheSameInList(item),
    };
  });
}

function isNameTheSameInList(list) {
  if (!(list && list.length)) return true;
  let compare = list[0].NameId;
  return list.every((item) => item.NameId === compare);
}

module.exports = {
  exerciseB,
  filterData,
};

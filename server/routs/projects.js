const express = require("express");
const router = express.Router();
const { projectModel } = require("../models/projectsModel");
const { UserModel } = require("../models/userModel");
//שולח את כל הפרוייקטים לדף הבית
router.get("/", async (req, res) => {
  let projects = await projectModel
    .find({})
    .populate({ path: "participants._id", model: UserModel });
  res.json(projects);
});

//הוספת פרוייקט
router.post("/", async (req, res) => {
  try {
    let project = new projectModel(req.body);
    await project.save();
    res.json(project._id);
  } catch (e) {
    res.status(400).json({ err: "project is not valid" });
  }
});
//למצוא פרוייקט על ידי מזהה שנשלח
router.get("/findproject_by_id/:id", async (req, res) => {
  let project = await projectModel
    .findById(req.params.id)
    .populate({ path: "participants._id", model: UserModel })
    .populate({ path: "missions.participants._id", model: UserModel });
  res.json(project);
});

//מחיקת פרוייקט
router.delete("/:nameOfproject", async (req, res) => {
  const projectDelete = await projectModel.deleteOne({
    nameOfproject: req.params.nameOfproject,
  });
  res.send("delete");
});
//test find specipic data in mission
router.get("/sendProjectForUpdate/:id", async (req, res) => {
  const project = await projectModel
    .findById(req.params.id)
    .populate({ path: "participants._id", model: UserModel });
  res.json({
    nameproject: project.nameOfproject,
    description: project.description,
    participants: project.participants,
  });
});
//     תיאור עדכון משימה
router.post(
  "/updateProject/:idProject/:idMission/:description",
  async (req, res) => {
    await projectModel.update(
      { "missions._id": req.params.idMission },
      {
        $set: {
          "missions.$.description": req.params.description,
        },
      }
    );
    const projectB = await projectModel.findById(req.params.idProject);
    res.json(projectB);
  }
);
//
router.delete(
  "/deletemissionbyid/:idproject/:idmission",
  async (req, res) => {}
);
// delete user of mission
router.post("/removeuser/:idProject/:idMission/:userId", async (req, res) => {
  await projectModel.findOneAndUpdate(
    { "missions._id": req.params.idMission },
    { $pull: { "missions.$.participants": { _id: req.params.userId } } },
    { multi: true }
  );
  const projectB = await projectModel.findById(req.params.idProject);
  res.json(projectB);
});
// join user
router.post("/adduser/:idProject/:idMission/:nameuser", async (req, res) => {
  const user = await UserModel.find({ name: req.params.nameuser });
  if (user.length === 1) {
    await projectModel.findOneAndUpdate(
      { "missions._id": req.params.idMission },
      {
        $push: { "missions.$.participants": { _id: user[0]._id } },
      },
      { multi: true }
    );
    const projectB = await projectModel.findById(req.params.idProject);
    res.json(projectB);
  } else {
    res.json("somthing went wrong");
  }
});

// delete mission in project
router.delete("/removemission/:idProject/:idMission/", async (req, res) => {
  await projectModel.update(
    { id: req.params.idMission },
    {
      $pull: { missions: { _id: req.params.idMission } },
    },
    { safe: true, multi: true }
  );
  const projectB = await projectModel.findById(req.params.idProject);
  res.json(projectB);
});
// delete project
router.delete("/removeproject/:idProject", async (req, res) => {
  await projectModel.findOneAndRemove({ _id: req.params.idProject });
  // const projectB = await projectModel.findById(req.params.idProject);
  res.json("succes");
});
// find user by name and return
router.get("/finduser/:nameuser", async (req, res) => {
  const user = await UserModel.find({ name: req.params.nameuser });
  res.json(user[0]._id);
});
// delete user of project
router.post("/removeusermission/:idProject/:nameuser", async (req, res) => {
  const user = await UserModel.find({ name: req.params.nameuser });
  if (user.length === 1) {
    await projectModel.findOneAndUpdate(
      { _id: req.params.idProject },
      { $pull: { participants: { _id: user[0]._id } } },
      { multi: true }
    );
  }
  const projectB = await projectModel.findById(req.params.idProject);
  res.json(projectB);
});

// change description project
router.post(
  "/changedescriptionproject/:idProject/:description",
  async (req, res) => {
    await projectModel.findOneAndUpdate(
      { _id: req.params.idProject },
      { $set: { description: req.params.description } },
      { multi: true }
    );
    const projectB = await projectModel.findById(req.params.idProject);
    res.json(projectB);
  }
);
// add user to project
router.post("/addusertoproject/:idProject/:nameuser", async (req, res) => {
  const user = await UserModel.find({ name: req.params.nameuser });
  if (user.length === 1) {
    await projectModel.findOneAndUpdate(
      { _id: req.params.idProject },
      {
        $push: { participants: { _id: user[0]._id } },
      },
      { multi: true }
    );
    const projectB = await projectModel.findById(req.params.idProject);
    res.json(projectB);
  } else {
    res.json("somthing went wrong");
  }
});
// add mission to project
router.post("/addmission/:idProject", async (req, res) => {
  await projectModel.update(
    { _id: req.params.idProject },
    {
      $push: {
        missions: {
          description: req.body.description,
          participants: [...req.body.participants],
          status: req.body.status,
        },
      },
    },
    { safe: true, multi: true }
  );
  const projectB = await projectModel.findById(req.params.idProject);
  res.json(projectB);
});
// change status
router.post("/changestatus/:idMission", async (req, res) => {
  await projectModel.update(
    { "missions._id": req.params.idMission },
    {
      $set: { "missions.$.status": req.body.status },
    },

    { safe: true, multi: true }
  );
  // const projectB = await projectModel.findById(req.params.idProject);
  res.json("sucses");
});
module.exports = router;

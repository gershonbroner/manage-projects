const express = require("express");
const router = express.Router();
const { UserModel, Validuser, Validlogin } = require("../models/userModel");

router.post("/validuser", async (req, res) => {
  let user = await UserModel.find({
    name: req.body.userName,
    pass: req.body.password,
  });
  if (user.length > 0) {
    res.send({ istrue: "true", user: user });
  } else {
    res.send("false");
  }
});

router.get("/", async (req, res) => {
  let User = await UserModel.find({});
  res.json(User);
});

router.post("/", async (req, res) => {
  let validBody = Validuser(req.body);
  if (validBody.error) {
    return res.json("1");
  }
  try {
    let user = new UserModel(req.body);
    await user.save();
    user.pass = "****";
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: "email allready in use" });
  }
});

router.post("/login", async (req, res) => {
  let validBody = Validlogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  //נבדוק אם האיימיל קיים
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ msg: "user not found" });
  }
  //נבדוק שהסיסמא קיימת
  let passValid = await bcrypt.compare(req.body.pass, user.pass);
  if (!passValid) {
    return res.status(401).json({ msg: "pass wrong" });
  }

  let newtoken = genToken(user._id);
  res.json({ token: newtoken });
});

module.exports = router;

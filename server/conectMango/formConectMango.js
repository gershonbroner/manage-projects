const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://gershon:KAQ35muAl6ONXeXy@cluster0.adbe6pu.mongodb.net/express1"
  );
}
//KAQ35muAl6ONXeXy
//mongodb+srv://gershon:KAQ35muAl6ONXeXy@cluster0.adbe6pu.mongodb.net/test

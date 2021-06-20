const express = require("express");
const db = require("./db/models");
const app = express();

const events = require("./routes/events");
app.use(express.json());

app.use("/events", events);

//db.sequelize.sync();
db.sequelize.sync({ alter: true });
//db.sequelize.sync({ force: true });

app.listen(8000, () => {
  console.log("hello there:8000");
});

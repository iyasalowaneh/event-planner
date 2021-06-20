const express = require("express");

const {
  eventList,
  eventDetail,
  eventCreate,
  eventUpdate,
  eventDelete,
  fullyBookedEventsList,
} = require("../controllers/eventsController");

const router = express.Router();

router.get("/", eventList);
router.get("/fullybooked", fullyBookedEventsList);

router.post("/", eventCreate);
router.get("/:eventId", eventDetail);
router.delete("/", eventDelete);
router.put("/:eventId", eventUpdate);
module.exports = router;

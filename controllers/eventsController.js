const { Op } = require("sequelize");
const { Event, sequelize } = require("../db/models");

exports.eventCreate = async (req, res) => {
  try {
    const events = req.body;
    if (events.length) {
      const newEvent = await Event.bulkCreate(events);
      res.status(201).json(newEvent);
    } else {
      const newEvent = await Event.create(events);
      res.status(201).json(newEvent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Servor Error" });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      foundEvent.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Servor Error" });
  }
};

exports.eventDelete = async (req, res) => {
  try {
    const eventsId = req.body;
    eventsId.map(async (eventId) => {
      const foundEvent = await Event.findByPk(eventId);
      if (foundEvent) {
        foundEvent.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "event  doesn't exist." });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Servor Error" });
  }
};

exports.eventDetail = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      res.json(foundEvent);
    } else {
      res.status(404).json({ message: "event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Servor Error" });
  }
};

exports.fullyBookedEventsList = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        numOfSeats: { [Op.eq]: sequelize.col("bookedSeats") },
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventList = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.Date) {
      console.log("entered");
      const events = await Event.findAll({
        where: {
          startDate: { [Op.gt]: req.body.Date },
        },
        order: [["startDate"], ["name"]],
      });
      res.json(events);
    } else {
      const events = await Event.findAll({ order: [["startDate"], ["name"]] });
      res.json(events);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

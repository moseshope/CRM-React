const Location = require("../models/Location");

exports.locationByZip = async (req, res, next, zip) => {
  const location = await Location.find({ zip });

  if (!location) {
    return res.status(400).json({
      error: "Location not found"
    });
  }
  req.location = location; // adds location object in req with location info
  next();
};

exports.add = async (req, res) => {
  const location = new Location(req.body);

  await location.save();

  res.json(location);
};

exports.getLocations = async (req, res) => {
  const location = await Location.find({}).sort({ name: 1 });

  res.json(location);
};

exports.read = async (req, res) => {
  res.json(req.location);
};

exports.update = async (req, res) => {
  let location = req.location;

  location = _.extend(bus, req.body);

  await location.save();

  res.json(location);
};

exports.remove = async (req, res) => {
  let location = req.location;

  await location.remove();

  res.json({ message: "Locatioin removed successfully" });
};

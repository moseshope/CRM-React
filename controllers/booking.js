const Booking = require("../models/Booking");
const Bus = require("../models/Bus");
const Guest = require("../models/Guest");
const _ = require("lodash");

exports.bookingById = async (req, res, next, id) => {
  const booking = await Booking.findById(id).populate("bus owner guest user");

  if (!booking) {
    return res.status(400).json({
      error: "booking not found"
    });
  }
  req.booking = booking; // adds booking object in req with booking info
  next();
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find({}).populate("bus owner guest user");

  res.json(bookings);
};

exports.getOwnerBookings = async (req, res) => {
  const bookings = await Booking.find({ owner: req.ownerauth }).populate(
    "bus owner guest user"
  );

  res.json(bookings);
};

exports.postBooking = async (req, res) => {
  const booking = new Booking(req.body);
  if (req.userauth) {
    booking.user = req.userauth;
  } else {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    let user = await Guest.findOne({ phone });

    if (user) {
      user = _.extend(user, req.body);
      await user.save();
      booking.guest = user;
    } else {
      const guest = new Guest({ name, email, phone, address });
      await guest.save();
      booking.guest = guest;
    }
  }

  const bus = await Bus.findOne({ slug: req.bus.slug });

  if (
    bus.seatsAvailable < (req.body.passengers || booking.passengers) ||
    bus.isAvailable !== true ||
    bus.bookedSeat.includes(booking.seatNumber)
  ) {
    return res.status(400).json({
      error: "Not available"
    });
  }

  bus.seatsAvailable -= req.body.passengers || booking.passengers;

  bus.bookedSeat.push(booking.seatNumber);
  
  booking.bus = bus;
  booking.owner = bus.owner;
  
  await booking.save();
  await bus.save();

  res.json(booking);
};

exports.changeVerificationStatus = async (req, res) => {
  const booking = req.booking;

  booking.verification = req.body.verification;

  await booking.save();

  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  const booking = req.booking;

  await booking.remove();

  res.json(booking);
};

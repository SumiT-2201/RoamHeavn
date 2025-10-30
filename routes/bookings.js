const express = require("express");
const router = express.Router();
const Listing = require("../models/listing"); // adjust path to your model
const Booking = require("../models/booking"); // add this line

// Show booking form page
router.get("/:id/book", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found"); // fixed flash message
    return res.redirect("/listings");
  }
  res.render("bookings/new", { listing });
});

// Handle booking form submission
router.post("/", async (req, res) => {
  const { listingId, name, mobile, email, startDate, endDate } = req.body;

  try {
    const booking = new Booking({
      listing: listingId,
      name,
      mobile,
      email,
      startDate,
      endDate
    });

    await booking.save();
    req.flash("success", "Booking confirmed!");
    res.redirect(`/listings/${listingId}`);
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong with booking.");
    res.redirect(`/listings/${listingId}`);
  }
});

module.exports = router;

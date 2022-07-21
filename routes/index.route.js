const { Router } = require("express");
const Story = require("../models/stories.model.js");
const { ensureGuest, ensureAuth } = require("../middleware/auth");
const router = Router();

// @desc login/landing page
// @ route GET /

router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc login/landing page
// @ route GET / dashboard

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user._id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;

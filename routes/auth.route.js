const { Router } = require("express");
const passport = require("passport");
const router = Router();

// @desc Auth with Google
// @ route GET /auth/google

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// @desc Google Auth Callback
// @ route GET / auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc     Logout user
// @ route GET   /auth/logout
router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
module.exports = router;

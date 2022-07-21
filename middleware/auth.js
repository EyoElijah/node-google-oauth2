const ensureAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

const ensureGuest = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else return next();
};

module.exports = {
  ensureGuest,
  ensureAuth,
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

exports.isMunicipalOfficer = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "municipal_officer" || req.user.role === "admin")
  ) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as municipal officer" });
  }
};

exports.isChampion = (req, res, next) => {
  if (req.user && req.user.role === "champion") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as champion" });
  }
};

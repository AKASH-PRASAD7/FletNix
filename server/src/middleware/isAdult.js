const isAdult = async (req, res, next) => {
  try {
    const user = req.body.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!user.age) {
      return res.status(400).json({ success: false, message: "Age not found" });
    }

    if (user.age < 18) {
      req.body = { adult: false };
    } else {
      req.body = { adult: true };
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default isAdult;

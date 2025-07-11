const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Admin
      if(decoded.role === 'admin'){
        req.user = { role: 'admin', email: decoded.email, name: 'Admin' };
      }else{
           // User or Car Owner
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });
        req.user = user;
      }

      // Role Check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = protect;

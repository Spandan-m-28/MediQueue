import { User } from "../models/user.model.js";

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    // Checking is user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Checking is the role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};

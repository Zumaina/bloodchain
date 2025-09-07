import jwt from "jsonwebtoken";

/**
 * Protect routes using Authorization: Bearer <token>
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ message: "Not authorized: missing or malformed token" });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach minimal user info to request for downstream handlers
    req.user = { id: decoded.id };
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Not authorized: invalid or expired token" });
  }
};

export default authMiddleware;

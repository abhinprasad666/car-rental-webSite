/**
 * Middleware to authorize admin users only
 */
export const isAdmin = (req, res, next) => {
  // console.log("admin", req.user);
  if (req.user.role === "admin") {
    return next();
  }
  res.status(403).json({
    success: false,
    Error: "Access denied: Admin privileges required",
  });
};

/**
 * Middleware to authorize sellers or admins only
 */
export const isDealerOrAdmin = (req, res, next) => {
  
  if (req.user.role === "dealer" || req.user.role === "admin") {
    return next();
  }
  res.status(403).json({
    success: false,
    Error: "Access denied: Only dealer or administrators are permitted",
  });
};

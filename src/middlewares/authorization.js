async function isAuthorized(req, res, next) {
  try {
    const user_details = req?.user_details;
    const { userId } = req.params;

    if (user_details.id !== parseInt(userId)) {
      return res.status(401).json({
        message: "unauthorized user !",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
}

export { isAuthorized };

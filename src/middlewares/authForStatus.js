async function authForStatus(req, res, next) {
  try {
    const records = await DB.query(TasksQueries.getTaskById, [
      req.params.taskId,
    ]);
    if (!records.rowCount) {
      return res.status(404).json({ message: "resource does not found" });
    }
    const task = records.rows.at(0);
    if (
      task.assigned_to !== req.user_details.id &&
      task.created_by !== req.user_details.id
    ) {
      return res.status(401).json({
        message: "unauthorized user!",
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

export { authForStatus };

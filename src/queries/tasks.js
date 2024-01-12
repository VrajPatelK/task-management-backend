const createNewTask = (columns, colNumbers) => `
INSERT INTO TASKS 
(${columns})
VALUES
(${colNumbers})`;

const getAllTasks = `SELECT * FROM TASKS`;
const getAllTasksByUserId = `SELECT * FROM TASKS WHERE assigned_to = $1`;
const getTaskById = `SELECT * FROM TASKS WHERE id = $1`;
const updateTaskById = (columns) => `
UPDATE TASKS
SET
${columns}
WHERE id = $1`;

const deleteTaskById = `DELETE FROM TASKS WHERE id = $1`;

export {
  createNewTask,
  getAllTasks,
  getTaskById,
  getAllTasksByUserId,
  updateTaskById,
  deleteTaskById,
};

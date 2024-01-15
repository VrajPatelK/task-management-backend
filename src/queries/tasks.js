const createNewTask = (columns, colNumbers) => `
INSERT INTO TASKS 
(${columns})
VALUES
(${colNumbers})`;

const getAllTasks = `
SELECT * FROM 
TASKS T INNER JOIN USERS U ON
T.assigned_to = U.ID`;
const getAllTasksByUserId = `
SELECT * FROM 
TASKS T INNER JOIN USERS U ON
T.assigned_to = U.ID
WHERE assigned_to = $1`;
const getTaskById = `SELECT * FROM TASKS WHERE id = $1`;
const getTaskByUserId = `SELECT * FROM TASKS WHERE id = $1 AND assigned_to = $2`;
const updateTaskById = (columns) => `
UPDATE TASKS
SET
${columns}
WHERE id = $1`;
const updateTaskStatusById = `
UPDATE TASKS
SET
status
WHERE id = $1`;

const deleteTaskById = `DELETE FROM TASKS WHERE id = $1`;

export {
  createNewTask,
  getAllTasks,
  getTaskById,
  getAllTasksByUserId,
  getTaskByUserId,
  updateTaskById,
  deleteTaskById,
};

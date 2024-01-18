const createNewTask = (columns, colNumbers) => `
INSERT INTO TASKS 
(${columns})
VALUES
(${colNumbers})`;

const getAllTasks = `
SELECT T.*, U.EMAIL, U.USERNAME, U.PASSWORD, U.USER_TYPE, U.PROFILE_IMG FROM 
TASKS T INNER JOIN USERS U ON
T.assigned_to = U.ID;`;

const getAllTasksByStatus = `
SELECT T.*, U.EMAIL, U.USERNAME, U.PASSWORD, U.USER_TYPE, U.PROFILE_IMG FROM 
TASKS T INNER JOIN USERS U ON
T.assigned_to = U.ID
WHERE T.STATUS = $1;`;

const getAllTasksByStatusAndUserId = `
SELECT T.*, U.EMAIL, U.USERNAME, U.PASSWORD, U.USER_TYPE, U.PROFILE_IMG FROM 
TASKS T INNER JOIN USERS U ON
T.assigned_to = U.ID
WHERE T.ASSIGNED_TO = $1 AND T.STATUS = $2;`;

const getAllTasksBySearchAndUserId = `
SELECT T.*, U.EMAIL, U.USERNAME, U.PASSWORD, U.USER_TYPE, U.PROFILE_IMG FROM 
TASKS T INNER JOIN USERS U ON
T.assigned_to = U.ID
WHERE (T.TITLE LIKE ANY (ARRAY [%L]) OR T.DESCRIPTION LIKE ANY (ARRAY [%L])) AND T.ASSIGNED_TO = $1`;

const getAllTasksBySearch = `
SELECT T.*, U.EMAIL, U.USERNAME, U.PASSWORD, U.USER_TYPE, U.PROFILE_IMG FROM 
TASKS T INNER JOIN USERS U ON
T.assigned_to = U.ID
WHERE T.TITLE LIKE ANY (ARRAY [%L]) OR T.DESCRIPTION LIKE ANY (ARRAY [%L])`;

const getAllTasksByUserId = `
SELECT T.*, U.EMAIL, U.USERNAME, U.PASSWORD, U.USER_TYPE, U.PROFILE_IMG FROM 
TASKS T INNER JOIN USERS U ON
T.assigned_to = U.ID
WHERE T.assigned_to = $1`;
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
  getAllTasksByStatus,
  getAllTasksBySearch,
  getTaskById,
  getAllTasksByStatusAndUserId,
  getAllTasksBySearchAndUserId,
  getAllTasksByUserId,
  getTaskByUserId,
  updateTaskById,
  deleteTaskById,
};

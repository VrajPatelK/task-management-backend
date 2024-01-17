const createNewUser = (columns, colNumbers) => `
INSERT INTO USERS 
(${columns})
VALUES
(${colNumbers})`;

const getAllUsers = `SELECT * FROM USERS`;
const getAllUsersBySearch = `SELECT * FROM USERS WHERE USERNAME LIKE ANY (ARRAY [%L]) OR EMAIL LIKE ANY (ARRAY [%L])`;
const getUserById = `SELECT * FROM USERS WHERE id = $1`;
const getUserByEmail = `SELECT * FROM USERS WHERE email = $1`;
const getUsersByUserType = `SELECT * FROM USERS WHERE user_type = $1`;
const updateUserById = (columns) => `
UPDATE USERS
SET
${columns}
WHERE id = $1`;

const deleteUserById = `DELETE FROM USERS WHERE id = $1`;

export {
  createNewUser,
  getAllUsers,
  getUsersByUserType,
  getAllUsersBySearch,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};

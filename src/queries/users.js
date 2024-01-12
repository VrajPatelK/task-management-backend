const createNewUser = `
INSERT INTO USERS 
(email, username, password, user_type)
VALUES
($1, $2, $3, $4)`;

const createNewUserWithProfileImg = `
INSERT INTO USERS 
(email, username, password, user_type, profile_img)
VALUES
($1, $2, $3, $4, $5)`;

const getAllUsers = `SELECT * FROM USERS`;
const getUserById = `SELECT * FROM USERS WHERE id = $1`;
const getUsersByUserType = `SELECT * FROM USERS WHERE user_type = $1`;
const updateUserById = `
UPDATE USERS
SET
email = $2, 
username = $3, 
password = $4, 
user_type = $5
WHERE
id = $1`;

const updateUserWithProfileImgById = `
UPDATE USERS
SET
email = $2, 
username = $3, 
password = $4, 
user_type = $5, 
profile_img = $6
WHERE
id = $1`;
const deleteUserById = `DELETE FROM USERS WHERE id = $1`;

export {
  createNewUser,
  createNewUserWithProfileImg,
  getAllUsers,
  getUsersByUserType,
  getUserById,
  updateUserById,
  updateUserWithProfileImgById,
  deleteUserById,
};

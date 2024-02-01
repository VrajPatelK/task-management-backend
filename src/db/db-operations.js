import DB from "./credential.js";

function open_connection() {
  // Event listener for successful connection
  DB.on("connect", (client) => {
    console.log("Client connected to the database");
  });
}

function close_connection() {
  // Close the connection pool when your application is shutting down
  pool
    .end()
    .then(() => console.log("Connection pool closed"))
    .catch((err) => console.error("Error closing connection pool", err));
}

function remove() {
  // Event listener for client disconnection
  DB.on("remove", (client) => {
    console.log("Client removed from the connection pool");
  });
}

function db_error() {
  // Event listener for errors
  DB.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
  });
}

export { open_connection, close_connection, remove, db_error };

// config/database.js
require("dotenv").config({ path: "/.env" });

module.exports = { //exporting an object

    'url': process.env.URL,
    'dbName':process.env.DB_NAME
};

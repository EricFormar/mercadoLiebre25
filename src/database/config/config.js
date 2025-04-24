require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port" : process.env.DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_TEST_USERNAME || 'root',
    "password": process.env.DB_TEST_PASSWORD || null,
    "database": process.env.DB_TEST_NAME || "test",
    "host": process.env.DB_TEST_HOST || 'localhost',
    "port" : process.env.DB_TEST_PORT || 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

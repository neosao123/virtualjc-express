require("dotenv").config();

module.exports = {
    SECRETE_KEY: process.env.SECRETE_KEY,
    MONGO_URL: process.env.MONGODB_URI
}

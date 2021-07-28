let config = {
    dbHost: process.env.DB_HOST || "localhost",
    dbUser: process.env.DB_USERNAME || "root",
    dbPassword: process.env.DB_PASSWORD || "root",
    dbName: process.env.DB_DATABASE || "Bookalu",
};

module.exports = {
    config
}
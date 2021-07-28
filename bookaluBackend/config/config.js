let config = {
    dbHost: process.env.DB_HOST || "localhost",
    dbUser: process.env.DB_USERNAME || "root",
    dbPassword: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_DATABASE || "",
};

module.exports = {
    config
}
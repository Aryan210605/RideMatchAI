const pool = require("../database/db");

// Find user by email
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0];
};

// Create new user
const createUser = async (full_name, email, password, role = "rider") => {
    const result = await pool.query(
        `INSERT INTO users (full_name, email, password, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id, full_name, email, role`,
        [full_name, email, password, role]
    );

    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    createUser,
};
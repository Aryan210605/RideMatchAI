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

// Get all users
const getAllUsers = async () => {

    const result = await pool.query(
        `SELECT
            id,
            full_name,
            email,
            role,
            status,
            created_at
        FROM users
        ORDER BY id ASC`
    );

    return result.rows;

};

// Block user
const blockUser = async (id) => {

    const result = await pool.query(
        `UPDATE users
         SET status = 'blocked'
         WHERE id = $1
         RETURNING id, full_name, email, role, status`,
        [id]
    );

    return result.rows[0];

};

// Unblock user
const unblockUser = async (id) => {

    const result = await pool.query(
        `UPDATE users
         SET status = 'active'
         WHERE id = $1
         RETURNING id, full_name, email, role, status`,
        [id]
    );

    return result.rows[0];

};

// Delete user
const deleteUser = async (id) => {

    const result = await pool.query(
        `DELETE FROM users
         WHERE id = $1
         RETURNING id, full_name, email`,
        [id]
    );

    return result.rows[0];

};

module.exports = {
    findUserByEmail,
    createUser,
    getAllUsers,
    blockUser,
    unblockUser,
    deleteUser
};
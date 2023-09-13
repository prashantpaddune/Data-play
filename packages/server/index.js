const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const isSafeQuery = require("./helpers/safe-query");
const logQuery = require("./helpers/log-query");

const app = express();
const PORT = 3001;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    statement_timeout: 5000
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/query', async (req, res) => {
    const { query } = req.body;

    if (!isSafeQuery(query)) {
        res.status(400).json({ error: "Unsafe query detected." });
        return;
    }

    try {
        const result = await pool.query(query);
        logQuery(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

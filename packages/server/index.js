require('./helpers/load-env');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const isSafeQuery = require("./helpers/safe-query");
const rateLimit = require('express-rate-limit');
const getColumns = require("./helpers/get-columns");

const app = express();
const PORT = process.env.PORT || 3001;

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


// Set up rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.post('/query', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        res.status(400).json({ error: "No query provided." });
        return;
    }

    if (!isSafeQuery(query)) {
        res.status(400).json({ error: "Unsafe query detected." });
        return;
    }

    try {
        const result = await pool.query(query);
        res.status(200).json({ columns: getColumns(result), query_results: result.rows })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/autocomplete', async (req, res) => {
    try {
        const tablesResult = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
        `);

        const tables = tablesResult.rows.map(row => row.table_name);

        let schema = [];

        for (let table of tables) {
            const columnsResult = await pool.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_schema = 'public' AND table_name = $1
            `, [table]);

            const columns = columnsResult.rows.map(row => row.column_name);

            schema.push({ table, columns });
        }

        res.status(200).json(schema);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

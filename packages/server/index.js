require('./helpers/load-env');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const fs = require('fs-extra');
const path = require('path');
const csv = require('csv-parser');

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

app.post('/api/query', async (req, res) => {
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

app.get('/api/auto-complete', async (req, res) => {
    try {
        const tablesResult = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
        `);

        const tables = tablesResult.rows.map(row => row.table_name);

        const columnSet = new Set();

        for (let table of tables) {
            const columnsResult = await pool.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_schema = 'public' AND table_name = $1
            `, [table]);

            const columns = columnsResult.rows.map(row => row.column_name);

            columns.forEach(col => columnSet.add(col));
        }

        const uniqueColumns = [...columnSet];

        const suggestionData = {
            tables: tables,
            columns: uniqueColumns
        };

        res.status(200).json(suggestionData);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function tableExists(tableName) {
    const result = await pool.query("SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = $1)", [tableName]);
    return result.rows[0].exists;
}

async function columnExists(tableName, columnName) {
    const result = await pool.query("SELECT EXISTS (SELECT FROM information_schema.columns WHERE table_name = $1 AND column_name = $2)", [tableName, columnName]);
    return result.rows[0].exists;
}

app.get('/api/import-csvs', async (req, res) => {
    const directoryPath = path.join(__dirname, 'data');

    try {
        const files = await fs.readdir(directoryPath);
        for (const file of files) {
            if (path.extname(file) === '.csv') {
                const tableName = path.basename(file, '.csv').toLowerCase();

                if (!await tableExists(tableName)) {
                    await pool.query(`CREATE TABLE "${tableName}" ()`);
                }

                const data = [];

                fs.createReadStream(path.join(directoryPath, file))
                    .pipe(csv())
                    .on('data', (row) => data.push(row))
                    .on('end', async () => {
                        for (const row of data) {
                            for (const col of Object.keys(row)) {
                                if (!await columnExists(tableName, col)) {
                                    await pool.query(`ALTER TABLE "${tableName}" ADD COLUMN "${col}" text`);
                                }
                            }

                            const cols = Object.keys(row).map(col => `"${col}"`).join(', ');
                            const values = Object.values(row).map(val => `'${val.replace(/'/g, "''")}'`).join(', ');
                            await pool.query(`INSERT INTO "${tableName}" (${cols}) VALUES (${values})`);
                        }
                    });
            }
        }
        res.send('CSVs imported to PostgreSQL successfully!');
    } catch (err) {
        console.error(`Error: ${err}`);
        res.status(500).send('Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

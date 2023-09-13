const getColumns = (result) => {
    if (!result.rows.length) return [];

    return Object.keys(result.rows[0]).map(key => ({
        key: key,
        type: typeof result.rows[0][key]
    }));
}

module.exports = getColumns;
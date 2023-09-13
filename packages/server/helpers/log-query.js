const logQuery = (query) => {
    console.log(`Executed at ${new Date().toISOString()}: ${query}`);
}

module.exports = logQuery;
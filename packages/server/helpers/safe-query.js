const isSafeQuery = (query) => {
    const blacklist = ["DROP", "DELETE", "INSERT", "UPDATE"];
    return !blacklist.some(keyword => query.toUpperCase().includes(keyword));
}

module.exports = isSafeQuery;
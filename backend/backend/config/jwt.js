module.exports = { 
    secret: process.env.JWT_SECRET,
    ttl: '1h',  // sec, 1d, 1h
    refreshTtl: '1h'
}
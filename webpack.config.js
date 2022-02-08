module.exports = {
    resolve: {
        fallback: {
            crypto: false,
            "url": false,
            "http": require.resolve("stream-http"),
            "crypto": false
        }
    }
};
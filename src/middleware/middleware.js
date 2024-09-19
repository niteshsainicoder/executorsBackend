const apiKeyMiddleware = (req, res, next) => {
    const api_Key = req.headers['x-api-key']; // Extract API key from headers
    const validApiKey = process.env.API_KEY; // Access environment variable key
console.log(api_Key,"                      ",validApiKey);

    // Check if the API key matches the stored valid API key
    if (validApiKey && validApiKey === api_Key) {
        
        next(); // Proceed if the API key is valid
    } else {
       
        return res.status(403).json({ success: false, message: 'Invalid API key' });
    }
};

export default apiKeyMiddleware;


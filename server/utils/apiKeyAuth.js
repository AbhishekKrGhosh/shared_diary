export const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
  
    const validApiKey = process.env.API_KEY; 
  
    if (apiKey === validApiKey) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
  };
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
          console.error('Token verification error:', err);
          return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
    
        // Check if the decoded token contains the expected role ('admin' in this case)
        if (!decoded.role || decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Forbidden: Not authorized as Admin' });
        }
        // If the token is valid and the user has the expected role, add decoded user information to the request object
        req.user = decoded;
        next(); // Continue to the next middleware or route handler
      });
};

module.exports = verifyToken;

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
    
        // Check if the decoded token contains the expected role ('user' in this case)
        if (!decoded.role || decoded.role !== 'user') {
          return res.status(403).json({ message: 'Forbidden: Not authorized as User' });
        }
    
        // If the token is valid and the user has the expected role, add decoded user information to the request object
        req.user = decoded;
        req.userId = decoded.id;
        req.userRole = decoded.role; // Extract the role from the decoded JWT payload

        next(); // Continue to the next middleware or route handler
      });
};

module.exports = verifyToken;

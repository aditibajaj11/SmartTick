import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: 'No token provided',
      });
    }

    // Extract token from Authorization header
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    // Verify token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    
    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Fetch user from database
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: 'Forbidden: Admin access required',
      });
    }

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

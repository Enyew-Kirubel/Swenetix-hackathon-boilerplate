import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

// Dynamically extract the document instance type directly from the User model
type UserDocument = InstanceType<typeof User>;

// 1. Use the extracted type for the helper function
const generateToken = (user: UserDocument): string => {
  return jwt.sign(
    { id: user._id, role: (user as any).role }, // Cast to any if role isn't explicitly typed in the model yet
    process.env.JWT_SECRET || 'super_secret_hackathon_key', 
    { expiresIn: '1d' }
  );
};

// 2. Register Handler
export const registerHandler = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, password, role } = req.body;
    const user = await User.create({ email, password, role });
    
    return res.status(201).json({ success: true, token: generateToken(user), role: (user as any).role });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// 3. Login Handler
export const loginHandler = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    return res.status(200).json({ success: true, token: generateToken(user), role: (user as any).role });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Logout Handler
export const logoutHandler = async (_req: Request, res: Response): Promise<Response | void> => {
  try {
    // For stateless JWTs, we tell the frontend to delete the token from local storage/cookies.
    // If you ever use HTTP-only cookies in the future, this clears them automatically.
    res.clearCookie('token'); 
    
    return res.status(200).json({ 
      success: true, 
      message: "Logged out successfully. Please remove your token from client storage." 
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

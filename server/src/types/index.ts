import type { Request } from 'express';
import type { Document, Types } from 'mongoose';

// Extends Express Request to include userId added by JWT middleware
export interface AuthRequest extends Request {
  userId?: string;
}

// Shape of a User document in MongoDB
export interface IUser extends Document {
  name:     string;
  email:    string;
  password: string;
}

// Shape of a Todo document in MongoDB
export interface ITodo extends Document {
  user:        Types.ObjectId;
  title:       string;
  description: string;
  completed:   boolean;
  createdAt:   Date;
}
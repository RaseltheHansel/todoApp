import mongoose, {Schema} from "mongoose";
import type { ITodo } from "../types";

const todoSchema = new Schema<ITodo>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String, 
            default: '',
        },

        completed: {
            type: Boolean,
            default: false,
        }
    
    },
    { timestamps: true}
);

export default mongoose.model<ITodo>('Todo', todoSchema);

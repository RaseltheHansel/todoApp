export interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
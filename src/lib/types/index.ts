export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description?: string | null;
    status: 'PENDING' | 'COMPLETED';
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TasksResponse {
    tasks: Task[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }
  
  export interface CreateTaskInput {
    title: string;
    description?: string;
    status?: 'PENDING' | 'COMPLETED';
  }
  
  export interface UpdateTaskInput {
    title?: string;
    description?: string;
    status?: 'PENDING' | 'COMPLETED';
  }
  
  export interface TaskFilters {
    page: number;
    limit: number;
    status?: 'PENDING' | 'COMPLETED' | '';
    search: string;
  }

 
  
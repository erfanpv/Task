
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface Department {
  id(id: any): unknown;
  _id: string;
  department: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateDepartmentData {
  dept_name: string;
  description: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type AuthParams = {
  token: string;
};

export type DepartmentIdParams = {
  deptId: string;
  token: string;
};

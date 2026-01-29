import { AuthResponse, RegisterData, LoginCredentials, CreateDepartmentData, AuthParams, DepartmentIdParams } from '@/types';

const API_BASE_URL = process.env.API_BASE_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add Authorization header if token is provided
  const token = (options.headers as Record<string, string>)?.['Authorization'];
  if (token) {
    defaultHeaders['Authorization'] = token;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred');
  }
}

export const api = {
  // Auth endpoints
  register: (data: RegisterData): Promise<AuthResponse> =>
    apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: LoginCredentials): Promise<AuthResponse> =>
    apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Department endpoints
  addDepartment: ({
    data,
    token,
  }: {
    data: CreateDepartmentData;
    token: string;
  }) =>
    apiRequest('/add-department', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: token,
      },


    }),

  // Get all Departments
  getDepartments: ({ token }: AuthParams) =>
    apiRequest('/departments', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }),

  // Get single Department
  getDepartment: ({ deptId, token }: DepartmentIdParams) =>
    apiRequest(`/department/${deptId}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }),

  // Delete Department
  deleteDepartment: ({ deptId, token }: DepartmentIdParams) =>
    apiRequest(`/delete-department/${deptId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }),
};

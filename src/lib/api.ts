const API_BASE_URL = 'http://127.0.0.1/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || data.error || 'Request failed' };
    }

    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Auth endpoints
export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, password: string, name: string) =>
      request<{ token: string; user: User }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      }),
    me: () => request<User>('/auth/me'),
  },
  
  // Users
  users: {
    getAll: () => request<User[]>('/users'),
    getProfile: () => request<Profile>('/users/profile'),
    updateProfile: (data: Partial<Profile>) =>
      request<Profile>('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },
  
  // Challenges
  challenges: {
    getAll: () => request<Challenge[]>('/challenges'),
    getById: (id: string) => request<Challenge>(`/challenges/${id}`),
    create: (data: Omit<Challenge, 'id'>) =>
      request<Challenge>('/challenges', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<Challenge>) =>
      request<Challenge>(`/challenges/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<void>(`/challenges/${id}`, { method: 'DELETE' }),
  },
  
  // Labs
  labs: {
    getAll: () => request<Lab[]>('/labs'),
    getById: (id: string) => request<Lab>(`/labs/${id}`),
    create: (data: Omit<Lab, 'id'>) =>
      request<Lab>('/labs', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<Lab>) =>
      request<Lab>(`/labs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<void>(`/labs/${id}`, { method: 'DELETE' }),
  },
  
  // Submissions
  submissions: {
    getAll: () => request<Submission[]>('/submissions'),
    submit: (challengeId: string, flag: string) =>
      request<{ correct: boolean; submission: Submission }>('/submissions', {
        method: 'POST',
        body: JSON.stringify({ challenge_id: challengeId, flag }),
      }),
  },
  
  // Lab Progress
  labProgress: {
    getAll: () => request<LabProgress[]>('/lab-progress'),
    update: (labId: string, completed: boolean) =>
      request<LabProgress>('/lab-progress', {
        method: 'POST',
        body: JSON.stringify({ lab_id: labId, completed }),
      }),
  },
};

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Profile {
  id: string;
  name: string;
  email: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  description: string;
  flag?: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  modules: number;
}

export interface Submission {
  id: string;
  challenge_id: string;
  user_id: string;
  solved: boolean;
  solved_at?: string;
}

export interface LabProgress {
  id: string;
  lab_id: string;
  user_id: string;
  completed: boolean;
  completed_at?: string;
}

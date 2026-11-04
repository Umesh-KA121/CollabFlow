export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface HealthResponse {
  success: boolean;
  message: string;
  services: {
    api: string;
    mongodb: string;
    redis: string;
  };
  timestamp: string;
}

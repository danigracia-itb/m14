
export interface User {
    id: number,
    name: string,
    email: string,
    email_verified_at: Date | null,
    two_factor_secret: number | null,
    two_factor_recovery_codes: Array<number> | null,
    created_at: Date | null,
    updated_at: Date | null,
}

export interface LoginForm {
    email: string;
    password: string;
  }
  
  export interface RegisterForm {
    name: string,
    email:string,
    password:string,
    password_confirmation:string
}

  export interface ErrorResponse {
    message: string;
    errors: Record<string, string[]>;
  }
  
  export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
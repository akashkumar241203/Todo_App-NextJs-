export interface SignupFormData {
  name: string;
  email: string;
  password: string | number;
}

export interface LoginFormData {
  email: string;
  password: string | number;
}

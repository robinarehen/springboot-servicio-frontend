export interface ResponseAuthInterface {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    apellidos: string;
    nombre: string;
    email: string;
    jti: string;
}

export interface AuthTokenInterface {
  apellidos?: string;
  user_name?: string;
  scope?: string[];
  exp?: number;
  nombre?: string;
  authorities?: string[];
  jti?: string;
  email?: string;
  client_id?: string;
}
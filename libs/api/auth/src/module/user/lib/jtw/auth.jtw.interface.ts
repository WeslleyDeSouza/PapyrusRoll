export interface IAuthJtwPayload {
  id: any; // LoginId
  refreshId?: any; // LoginRefreshId
  sub: any; // <UserId|Subject>
  uuId: string; // Device ID
  authCreatedAt: number; // User creation year
  companyId?: number;
  exp?: number;
  scopes?: string[];
  type?: string;
}

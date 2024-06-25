export class AppUserRole {
  id: string;
  roleName?: string;
  description?: string;
  createdBy?: string | null;
  createdDate: Date;
  updatedBy?: string | null;
  updatedDate: Date;
  isActive?: boolean;
}

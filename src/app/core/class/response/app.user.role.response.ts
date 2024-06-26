export class AppUserRoleResponse {
    id: string;
    roleName?: string;
    description?: string;
    createdBy?: string | null;
    createdByName?: string | null;
    createdDate: Date;
    updatedBy?: string | null;
    updatedByName?: string | null;
    updatedDate: Date;
    isActive?: boolean;
  }
  
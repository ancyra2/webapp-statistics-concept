export class createUserDto {
  Id: number;
  Name: string;
  Password: string;
  Email: string;
  Roles: string[];
  Permissions: string[];
  Created_at: Date;
  Updated_at: Date;
  Deleted_at: Date;
}

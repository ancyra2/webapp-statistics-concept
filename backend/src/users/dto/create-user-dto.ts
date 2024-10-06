export class CreateUserDto {
  id: number;
  username: string;
  password: string;
  email: string;
  roles: string[];
  permissions: string[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

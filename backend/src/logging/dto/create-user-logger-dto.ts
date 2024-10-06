export class CreateUserLoggerDto {
  id: number;
  userId: number;
  ipAddress: string;
  level: string;
  message: string;
  timestamp: Date;
}

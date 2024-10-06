import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserLogger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ipAddress: string;

  @Column()
  level: string;

  @Column()
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}

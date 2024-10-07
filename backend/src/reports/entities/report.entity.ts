import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  categoryID: number;

  @Column()
  subCategoryID: number;

  @Column({ type: 'text' })
  htmlContent: string;
}

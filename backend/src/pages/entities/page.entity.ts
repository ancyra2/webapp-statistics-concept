import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the page' })
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column('json')
  content: object;

  @Column({ length: 255, nullable: true })
  authorId: string;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column('json', { nullable: true })
  tags: string[];

  @Column({ length: 255, nullable: true })
  category: string;

  @Column('json', { nullable: true })
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
}

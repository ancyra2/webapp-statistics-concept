import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('subcategories')
export class SubCategory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the subcategory' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the subcategory' })
  name: string;

  @Column({ name: 'categoryId' })
  @ApiProperty({
    description: 'The ID of the category this subcategory belongs to',
  })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  @ApiProperty({
    type: () => Category,
    description: 'The category this subcategory belongs to',
  })
  category: Category;
}

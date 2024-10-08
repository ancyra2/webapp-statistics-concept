import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Category, (category) => category.subcategories)
  @ApiProperty({
    type: () => Category,
    description: 'The category this subcategory belongs to',
  })
  category: Category;
}

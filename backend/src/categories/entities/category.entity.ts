import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './subcategory.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the category' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  @ApiProperty({
    type: () => [SubCategory],
    description: 'The subcategories of the category',
  })
  subcategories: SubCategory[];
}

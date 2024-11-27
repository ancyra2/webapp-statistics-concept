import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty({
    example: 'Blog Başlığı',
    description: 'The title of the page',
  })
  title: string;

  @ApiProperty({
    example: 'blog-basligi',
    description: 'The unique slug for the page',
  })
  slug: string;

  @ApiProperty({
    example: [
      { type: 'header', data: { text: 'Blog Başlığı', level: 1 } },
      { type: 'paragraph', data: { text: 'Bu bir paragraf içeriğidir.' } },
    ],
    description: 'The content of the page',
  })
  content: object;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the author',
  })
  authorId?: string;

  @ApiProperty({ example: true, description: 'Publish status of the page' })
  isPublished?: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Publish date of the page',
  })
  publishedAt?: Date;

  @ApiProperty({
    example: ['nestjs', 'typescript'],
    description: 'Tags for the page',
  })
  tags?: string[];

  @ApiProperty({ example: 'Technology', description: 'Category of the page' })
  category?: string;

  @ApiProperty({
    example: {
      title: 'Blog Başlığı',
      description: 'Bu bir blog yazısıdır.',
      keywords: ['nestjs', 'blog', 'typescript'],
      canonicalUrl: 'https://example.com/blog-basligi',
    },
    description: 'SEO details for the page',
  })
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
}
